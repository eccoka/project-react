<?php

namespace App\Services;

use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class FileService
{
    public function uploadFile(Request $request, string $folder): string
    {
        // dd($request->all());
        try {
            $fileName = $request->file('description')->getClientOriginalName();
            $path = $request->file('description')->storeAs($folder, $fileName, 'public');

            return 'http://localhost:8000/storage/'.$path;
        } catch (\Exception $e) {
            Log::error('File upload error: '.$e->getMessage());
            throw new \Exception('Error by upload');
        }
    }

    public function deleteFile($request, string $folder): void
    {
        if ($folder === 'description') {
            $same = Item::query()->where('description', $request->description)->get();

            $file_delete = explode('storage/', $request->description)[1];
        }

        if (count($same) === 1) {
            Storage::disk('public')->delete($file_delete);
        }
    }
}
