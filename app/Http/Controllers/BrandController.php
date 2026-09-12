<?php

namespace App\Http\Controllers;

use App\Http\Resources\BrandResource;
use App\Models\Brand;
use App\Services\BrandService;
use App\Http\Requests\StoreBrandRequest;
use App\Http\Requests\UpdateBrandRequest;
use Illuminate\Http\RedirectResponse;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $brandsQuery = Brand::query()->orderBy('name', 'asc');
        $brands = $brandsQuery->paginate(15)->onEachSide(1);

        return inertia('brand/index', [
            "brands" => BrandResource::collection($brands),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('brand/create', [
            'success' => session('success'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBrandRequest $request)
    {

        $brand = (new BrandService())->createBrand($request);
        return redirect()->route('brand.create')->with('success', $brand->name . ' created successfully');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $brand = Brand::findOrFail($id);
        $brand->load('createdBy', 'updatedBy');
        $brand->created_by = $brand->createdBy->name;
        $brand->updated_by = $brand->updatedBy->name;
        return inertia('brand/edit', [
            'brand' => new BrandResource($brand),
            'success' => session('success'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBrandRequest $request, string $id): Brand|RedirectResponse
    {
        $brand = Brand::findOrFail($id);
        $brand = (new BrandService())->updateBrand($request, $brand);

        $brand->load('createdBy', 'updatedBy');
        $brand->created_by = $brand->createdBy->name;
        $brand->updated_by = $brand->updatedBy->name;

        return redirect()->route('brand.edit', $id)->with('success', $brand->name . ' updated successfully');
    }

}
