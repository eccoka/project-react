<?php

declare(strict_types=1);

namespace App\Services;

use App\Http\Requests\StoreBrandRequest;
use App\Models\Brand;
use App\Http\Requests\UpdateBrandRequest;

class BrandService{
    /**
     * Create a new brand.
     *
     * @param StoreBrandRequest $request
     * @return Brand
     */

    public function createBrand(StoreBrandRequest $request): Brand
    {
        // Validate the request data
        $brand = new Brand;
        $brand->fill($request->validated());
        $request->hasFile('imageFile') 
        ? $brand->logo = (new ImageService())->uploadImage($request, 'brands')
        : $brand->logo = null;
        $brand->created_by = auth()->user()->id;
        $brand->updated_by = auth()->user()->id;
        $brand->save();

        return $brand;
    }

    /**
     * Update the specified brand.
     *
     * @param UpdateBrandRequest $request
     * @param Brand $brand
     * @return Brand
     */
    public function updateBrand(UpdateBrandRequest $request, Brand $brand): Brand
    {
        // Validate the request data
        $brand->fill($request->validated());

        if ($request->hasFile('imageFile')) {
            $imageService = new ImageService();
            if ($brand->logo !== null) {
                $imageService->deleteImage($request, 'brands');
            }
            $brand->logo = $imageService->uploadImage($request, 'brands');
        }
        $brand->updated_by = auth()->user()->id;
        $brand->updated_at = now();

        $brand->save();

        return $brand;
    }
}