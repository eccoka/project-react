<?php

declare(strict_types=1);

namespace App\Services;

use App\Enums\ItemUnit;
use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\UpdateItemRequest;
use App\Http\Resources\ItemResource;
use App\Models\Brand;
use App\Models\Item;
use App\Models\ItemGroup;
use App\Models\Itemparam;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class ItemService
{
    public function index()
    {
        $itemsQuery = DB::table('items')
            ->join('brands', 'items.brandId', '=', 'brands.id')
            ->join('itemgroups', 'items.groupId', '=', 'itemgroups.id')
            ->select(
                'items.*',
                'brands.name as brand',
                'itemgroups.name as group'
            )
            ->orderBy('itemgroups.name', 'asc');

        return $itemsQuery;
    }

    public function show(Item $item): ItemResource|array
    {

        $pm_ids = explode(',', $item->parameter_ids);
        foreach ($pm_ids as $key => $value) {
            $itemparams[$key] = Itemparam::query()->select('param_name', 'value')->where('id', $value)->first();
        }

        $item->setAttribute('group', ItemGroup::query()->select('name')->where('id', $item->groupId)->first()->name);
        $item->setAttribute('brand', Brand::query()->select('name')->where('id', $item->brandId)->first()->name);
        $item->unit = ItemUnit::from((int) $item->unit)->getItemUnitName();
        $item->created_by = User::query()->select('name')->where('id', $item->created_by)->first()->name;
        if ($item->updated_at !== $item->created_at) {
            $item->updated_by = User::query()->select('name')->where('id', $item->updated_by)->first()->name;
        }

        // $item = new ItemResource($item);
        $items = ['item' => $item, 'itemparams' => $itemparams];

        return $items;
    }

    public function edit(Item $item): ItemResource|array
    {
        $itemparams = [];
        $parameters = [];

        $pm_ids = array_filter(explode(',', (string) $item->parameter_ids));
        foreach ($pm_ids as $value) {
            $itemparam = Itemparam::query()->select('param_name', 'value')->where('id', $value)->first();

            if ($itemparam !== null) {
                $itemparams[] = $itemparam;
            }
        }

        $group = ItemGroup::query()->select('name')->where('id', $item->groupId)->first();

        $item->setAttribute('group', $group->name);
        $item->setAttribute('brand', Brand::query()->select('name')->where('id', $item->brandId)->first()->name);
        $item->unit = ItemUnit::from((int) $item->unit)->getItemUnitName();

        $parameters = Itemparam::query()->where('status', 'active')
            ->where('groupid', $item->groupId)
            ->orderBy('param_name')->get()->toArray();

        $existingParamNames = array_map(function ($param) {
            return $param->param_name;
        }, $itemparams);

        // Filter out parameters that already exist in itemparams
        $parameters = array_filter($parameters, function ($parameter) use ($existingParamNames) {
            return ! in_array($parameter['param_name'], $existingParamNames);
        });

        // Re-index array to ensure sequential keys
        $parameters = array_values($parameters);

        $items = ['item' => $item, 'itemparams' => $itemparams, 'parameters' => $parameters];

        return $items;
    }

    public function store(StoreItemRequest $request): Item
    {
        $request_data = $request->validated();
        $item = new Item;

        if ($request->itemgroup_sub2 !== null) {
            $item->groupId = $request->itemgroup_sub2;
        } elseif ($request->itemgroup_sub !== null) {
            $item->groupId = $request->itemgroup_sub;
        } else {
            $item->groupId = $request->itemgroup_main;
        }

        $item->brandId = $request_data['brand'];
        $item->barcode = $request_data['barcode'];
        $item->name = $request_data['name'];
        $item->website = $request_data['website'];
        $item->status = 'active';
        $item->price = (float) $request_data['price'];
        $item->discount = (float) $request_data['discount'];
        $item->unit = (int) $request_data['unit'];
        $item->created_by = auth()->user()->id;
        $item->updated_by = auth()->user()->id;
        $item->save();

        return $item;
    }

    public function update(UpdateItemRequest $request, Item $item): Item
    {

        $request_data = $request->validated();

        if ($request->value != '' && $request->value !== null) {

            if ($item->parameter_ids !== '' && $item->parameter_ids !== null) {
                $item->parameter_ids .= ','.$request->value;
            } else {
                $item->parameter_ids = $request->value;
            }
        } else {
            // dd($request->all()); // Debugging line to check the incoming request data
            $descr = $item->description;
            $item->fill($request->validated());
            if ($request->hasFile('description')) {
                $fileService = new FileService;
                // dd($item->description);
                if ($descr !== '' && $descr !== null) {
                    $fileService->deleteFile($request, 'description');
                }
                $item->description = $fileService->uploadFile($request, 'description');
                $item->website = $request_data['website'] ?? $item->website;
                $item->status = $request_data['status'] ?? $item->status;
                $item->price = $request_data['price'] ?? $item->price;
                $item->discount = $request_data['discount'] ?? $item->discount;
            }
        }

        $item->updated_by = auth()->id();
        $item->save();

        return $item;
    }
}
