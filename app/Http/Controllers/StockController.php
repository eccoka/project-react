<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use App\Services\StockService;
use App\Http\Resources\StockResource;
use App\Http\Requests\StoreStockRequest;
use App\Http\Requests\UpdateStockRequest;

class StockController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $stocksQuery = Stock::query()->orderBy('stock_code', 'asc');
        $stocks =  $stocksQuery->paginate(15)->onEachSide(1);
        return inertia('stock/index', [
            "stocks" => StockResource::collection($stocks),
            "success" => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('stock/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStockRequest $request)
    {
        $stock = (new StockService())->createStock($request);
        return redirect()->route('stock.index')->with('success', 'Stock created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Stock $stock)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Stock $stock)
    {
        $stock = Stock::findOrFail($stock->id);
        $stock->load('createdBy', 'updatedBy');
        $stock->created_by = $stock->createdBy->name;
        $stock->updated_by = $stock->updatedBy->name;
        return inertia('stock/edit', [
            'stock' => new StockResource($stock),
            'success' => session('success'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStockRequest $request, Stock $stock)
    {
        $stock = (new StockService())->updateStock($request, $stock);
        return redirect()->route('stock.index')->with('success', 'Stock updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Stock $stock)
    {
        //
    }
}
