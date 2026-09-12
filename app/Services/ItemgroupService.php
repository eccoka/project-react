<?php
declare(strict_types=1);

namespace App\Services;

use App\Http\Requests\StoreItemgroupRequest;
use App\Http\Resources\ItemgroupResource;
use App\Models\Itemgroup;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\RedirectResponse;
use App\Services\ImageService;
use App\Http\Requests\UpdateItemgroupRequest;

class ItemgroupService
{
    public function index(): Collection
    {
        $itemgroups = Itemgroup::with(['parent', 'parent.parent'])->get();
    
        foreach ($itemgroups as $itemgroup) {
            if ($itemgroup->level === 3) {
                $sub1 = $itemgroup->parent;
                $main = $sub1?->parent;
    
                $itemgroup->sub2 = $itemgroup->name;
                $itemgroup->sub2pos = $itemgroup->position;
                $itemgroup->sub1 = $sub1?->name;
                $itemgroup->sub1pos = $sub1?->position;
                $itemgroup->main = $main?->name;
                $itemgroup->mainpos = $main?->position;
            }
    
            if ($itemgroup->level === 2) {
                $main = $itemgroup->parent;
                $itemgroup->sub1 = $itemgroup->name;
                $itemgroup->sub1pos = $itemgroup->position;
                $itemgroup->main = $main?->name;
                $itemgroup->mainpos = $main?->position;
            }
    
            if ($itemgroup->level === 1) {
                $itemgroup->main = $itemgroup->name;
                $itemgroup->mainpos = $itemgroup->position;
            }
        }
    
        $sorted = $itemgroups->sortBy([
            ['mainpos', 'asc'],
            ['sub1pos', 'asc'],
            ['sub2pos', 'asc'],
        ]);
    
        return $sorted;    
    }

    public function store(StoreItemgroupRequest $request): ItemgroupResource|RedirectResponse
    {
        $request->validated();

        // Ellenőrizzük, hogy létezik-e már az adott név és szint
        if (Itemgroup::query()->where('name', $request->name)->where('level', $request->level)->exists()) {
            return back()->withErrors(['error' => 'Name already exists']);
        }

        // Szülő azonosító meghatározása
        $parent_id = $request->parent 
            ? Itemgroup::query()
                ->where('level', $request->level - 1)
                ->where('name', $request->parent)
                ->pluck('id')
                ->first() ?? 0
            : 0;

        // Pozíció ütközés kezelése
        $this->handlePositionConflict($request->position, $parent_id, $request->level);

        // Kép feltöltése
        $request->hasFile('imageFile') 
            ? $request->image_path = (new ImageService())->uploadImage($request, 'itemgroup') 
            : $request->image_path = "0";

        // Új Itemgroup létrehozása
        $itemgroup = Itemgroup::create([
            'position' => $request->position,
            'name' => $request->name,
            'status' => $request->status,
            'level' => $request->level,
            'parent_id' => $parent_id,
            'image_path' => $request->image_path,
            'created_by' => $request->user_id,
            'updated_by' => $request->user_id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return new ItemgroupResource($itemgroup);
    }

    private function handlePositionConflict(string $position, int $parent_id, string $level): void
    {
        $itemPos = Itemgroup::query()
            ->where('position', $position)
            ->where('parent_id', $parent_id)
            ->first();

        if ($itemPos !== null) {
            $orderPosition = Itemgroup::query()
                ->where('level', $level)
                ->orderBy('position')
                ->get();

            foreach ($orderPosition as $item) {
                if ($item->position >= $position) {
                    $item->position++;
                    $item->save();
                }
            }
        }
    }

    public function edit(Itemgroup $itemgroup): ItemgroupResource
    {
        $itemgroup = Itemgroup::query()->where('id', $itemgroup->id)->first();
        if ($itemgroup !== null) {
            $parentQuery = Itemgroup::query()->where('id', $itemgroup->parent_id)->first();
            if ($parentQuery !== null) {
                $parentParentQuery = Itemgroup::query()->where('id', $parentQuery->parent_id)->first();
            }
        }
        $itemgroup->sub2 = $itemgroup->name ?? '';
        $itemgroup->sub1 = $parentQuery->name ?? '';
        $itemgroup->main = $parentParentQuery->name ?? '';
        $itemgroup->mainpos = $parentParentQuery->position ?? '';
        $itemgroup->sub1pos = $parentQuery->position ?? '';
        $itemgroup->sub2pos = $itemgroup->position ?? '';
        if ($itemgroup->created_by === $itemgroup->updated_by) {
            $itemgroup->created_by = $itemgroup->createdBy->name;
            $itemgroup->updated_by = $itemgroup->created_by;
        } else {
            $itemgroup->created_by = $itemgroup->createdBy->name;
            $itemgroup->updated_by = $itemgroup->updatedBy->name;
        }

        $itemgroup = new ItemgroupResource($itemgroup);

        return $itemgroup;
    }

    public function update(UpdateItemgroupRequest $request, Itemgroup $itemgroup): ItemgroupResource|RedirectResponse
    {
        $validatedData = $request->validated();

        $nameCheck = Itemgroup::where('name', $validatedData['name'])
            ->where('level', $validatedData['level'])
            ->where('parent_id', $itemgroup->parent_id)
            ->where('id', '!=', $itemgroup->id)
            ->get();

        if (count($nameCheck) > 0) {
            return back()->with('error', 'Name already exists');
        }

        $parent_id = $request->parent ?
            Itemgroup::where('level', $request->level - 1)
                ->where('name', $request->parent)
                ->value('id') :
            0;

        $itemPos = Itemgroup::where('parent_id', $parent_id)
            ->where('position', $validatedData['position'])
            ->where('id', '!=', $itemgroup->id)
            ->exists();

        if ($itemPos) {
            $this->updatePosition($validatedData['position'], $itemgroup, $parent_id);
        }

        $itemgroup->position = $validatedData['position'];
        $itemgroup->name = $validatedData['name'];
        $itemgroup->status = $validatedData['status'];
        $itemgroup->level = $validatedData['level'];
        $itemgroup->parent_id = $parent_id;

        // Image update using ImageService
        if ($request->hasFile('imageFile')) {
            $imageService = new ImageService();
            if ($itemgroup->image_path !== '0') {
                $imageService->deleteImage($itemgroup, 'itemgroup');
            }
            $itemgroup->image_path = $imageService->uploadImage($request, 'itemgroup');
        }

        $itemgroup->updated_by = auth()->user()->id;
        $itemgroup->updated_at = now();
        $itemgroup->save();

        return new ItemgroupResource($itemgroup);
    }

    public function destroy($itemgroup)
    {
        $subCheck = Itemgroup::where('parent_id', $itemgroup->id)->exists();

        if ($subCheck) {
            return redirect()->route('itemgroup.index')
                ->with('error', $itemgroup->name . " itemgroup has sub itemgroups, please delete them first");
        }

        $key = $itemgroup->position;
        $level = $itemgroup->level;

        // Delete image using ImageService
        if ($itemgroup->image_path !== '0') {
            $imageService = new ImageService();
            $imageService->deleteImage($itemgroup, 'itemgroup');
        }

        $itemgroup->delete();

        Itemgroup::where('level', $level)
            ->where('position', '>', $key)
            ->orderBy('position')
            ->each(function ($item) {
                $item->position--;
                $item->save();
            });
    }

    public function updatePosition($position, $itemgroup, $parent_id): void
    {
        $itemPosQuery = Itemgroup::query()->where('parent_id', $parent_id)->orderBy('position')->get();
        if ($itemgroup->position < $position) {
            for ($i = 0; $i < count($itemPosQuery); $i++) {
                if (($itemPosQuery[$i]->position > $itemgroup->position) && ($itemPosQuery[$i]->position <= $position)) {
                    $itemPosQuery[$i]->position = $itemPosQuery[$i]->position - 1;
                    $itemPosQuery[$i]->save();
                }
            }
        }
        if ($itemgroup->position > $position) {
            for ($i = 0; $i < count($itemPosQuery); $i++) {
                if (($itemPosQuery[$i]->position < $itemgroup->position) && ($itemPosQuery[$i]->position >= $position)) {
                    $itemPosQuery[$i]->position = $itemPosQuery[$i]->position + 1;
                    $itemPosQuery[$i]->save();
                }
            }
        }
    }
}