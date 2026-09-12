<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Brand;
use App\Enums\ItemUnit;
use App\Models\ItemGroup;
use App\Models\Itemparam;
use App\Services\ItemService;
use App\Http\Resources\ItemResource;
use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\UpdateItemRequest;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $itemsQuery = (new ItemService())->index();

        $items = $itemsQuery->paginate(15)->onEachSide(1);

        return inertia('item/index', [
            'items' => ItemResource::collection($items),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $units = ItemUnit::cases();
        $unitsWithNames = array_map(function ($unit) {
            return [
                'value' => $unit->value,
                'name' => $unit->getItemUnitName(),
            ];
        }, $units);


        return inertia('item/create', [
            'brands' => Brand::all(),
            'itemgroups' => ItemGroup::all(),
            'units' => $unitsWithNames,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreItemRequest $request)
    {

        $item = (new ItemService())->store($request);

        $parameters = Itemparam::query()->where('status', 'active')
            ->where('groupid', $item->groupId)
            ->orderBy('param_name')->get()->toArray();

        return inertia('item/paramsetup', [
            'item' => $item,
            'parameters' => $parameters,
        ]);


    }

    public function paramstore(Request $request)
    {
        $item = (new ItemService())->paramstore($request);
        //dd($item);
        //return redirect()->route('items.show', $item->id)->with('success', 'Item created successfully.');

    }

    /**
     * Display the specified resource.
     */
    public function show(Item $item)
    {
        $items = (new ItemService())->show($item);

        return inertia('item/show', [
            'item' => $items['item'],
            'itemparams' => $items['itemparams'],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Item $item, Request $request)
    {
        $items = (new ItemService())->edit($item, $request);

        //dd($parameters);
        return inertia('item/edit', [
            'item' => $items['item'],
            'itemparams' => $items['itemparams'],
            'parameters' => $items['parameters'],
            
        ]);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateItemRequest $request, Item $item)
    {
        $item = (new ItemService())->update($request, $item);

        return redirect()->route('item.show', $item->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Item $item)
    {
        //
    }
}