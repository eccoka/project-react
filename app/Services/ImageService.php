<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Models\Itemgroup;
use App\Models\Brand;
use App\Models\Stock;

class ImageService
{
    public function uploadImage(Request $request, string $folder): string
    {
        try {
            $fileName = $request->file('imageFile')->getClientOriginalName();
            $path = $request->file('imageFile')->storeAs($folder, $fileName, 'public');
            return 'http://localhost:8000/storage/' . $path;
        } catch (\Exception $e) {
            Log::error('File upload error: ' . $e->getMessage());
            throw new \Exception('Error by upload');
        }
    }

    public function updateImage(Request $request, string $folder, string $oldImagePath): string
    {
     
        if ($folder === 'avatar') {
            $same = User::query()->where('avatar', $oldImagePath)->get();
        }
        if ($folder === 'itemgroup') {
            $same = Itemgroup::query()->where('image_path', $oldImagePath)->get();
        }
        if (count($same) === 1) {
            $image_delete = explode('storage/', $oldImagePath)[1];
            Storage::disk('public')->delete($image_delete);
        }
        try {
            $fileName = $request->file('imageFile')->getClientOriginalName();
            $path = $request->file('imageFile')->storeAs($folder, $fileName, 'public');
            return 'http://localhost:8000/storage/' . $path;
        } catch (\Exception $e) {
            Log::error('File upload error: ' . $e->getMessage());
            throw new \Exception('Error by upload');
        }

    }
    public function deleteImage($request, string $folder): void
    {
        if ($folder === 'avatar') {
            $same = User::query()->where('avatar', $request->avatar)->get();
            $image_delete = explode('storage/', $request->avatar)[1];
        }   
        if ($folder === 'itemgroup') {
            $same = Itemgroup::query()->where('image_path', $request->image_path)->get();
            $image_delete = explode('storage/', $request->image_path)[1];
        }
        if ($folder === 'brands') {
            $same = Brand::query()->where('logo', $request->logo)->get();
            $image_delete = explode('storage/', $request->logo)[1];
        }
        if ($folder === 'stocks') {
            $same = Stock::query()->where('image', $request->image)->get();
            $image_delete = explode('storage/', $request->image)[1];
        }
        if (count($same) === 1) {
                Storage::disk('public')->delete($image_delete);
        }
    }
}