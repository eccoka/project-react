<?php

declare(strict_types=1);

namespace App\Services;

use App\Http\Requests\StoreStockRequest;
use App\Models\Stock;
use App\Http\Requests\UpdateStockRequest;
use App\Services\ImageService;
use Illuminate\Support\Facades\Storage;

class StockService
{
    /**
     * Create a new stock.
     *
     * @param StoreStockRequest $request
     * @return Stock
     */
    public function createStock(StoreStockRequest $request): Stock
    {
        // Validate the request data
        $stock = new Stock;
        $stock->fill($request->validated());
        $request->hasFile('imageFile')
            ? $stock->image = (new ImageService())->uploadImage($request, 'stocks')
            : $stock->image = null;
        $stock->created_by = auth()->user()->id;
        $stock->updated_by = auth()->user()->id;
        $stock->save();

        return $stock;
    }

    /**
     * Update the specified stock.
     *
     * @param UpdateStockRequest $request
     * @param Stock $stock
     * @return Stock
     */
    public function updateStock(UpdateStockRequest $request, Stock $stock): Stock
    {
        // Validate the request data
        $stock->fill($request->validated());
        if ($request->hasFile('imageFile')) {
            // Delete the old image if it exists
            $imageService = new ImageService();
            if ($stock->image !== null) {
                $imageService->deleteImage($request, 'stocks');
            }
            $stock->image = $imageService->uploadImage($request, 'stocks');
        }
        $stock->updated_by = auth()->user()->id;
        $stock->save();

        return $stock;
    }
}