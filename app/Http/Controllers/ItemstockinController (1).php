<?php

namespace App\Http\Controllers;

use App\Http\Resources\ItemResource;
use App\Models\Brand;
use App\Models\Itemstockin;
use App\Models\Item;
use App\Enums\ItemUnit;
use App\Http\Requests\StoreItemstockinRequest;
use App\Http\Requests\UpdateItemstockinRequest;

class ItemstockinController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        $items = Item::all();

        return inertia('itemstockin/create', [
            'brands' => Brand::all(),
            'items' => ItemResource::collection($items),
            'units' => $unitsWithNames,
        ]);
    }   

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreItemstockinRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Itemstockin $itemstock)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Itemstockin $itemstock)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateItemstockinRequest $request, Itemstockin $itemstock)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Itemstockin $itemstock)
    {
        //
    }
}
