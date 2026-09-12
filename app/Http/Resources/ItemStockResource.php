<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;
use App\Http\Resources\ItemResource;
use App\Http\Resources\UserResource;

class ItemStockResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'item' => new ItemResource($this->item),
            'stock' => $this->stock,
            'unit' => $this->unit,
            'delivery_note_id' => $this->delivery_note_id,
            'createdBy' => new UserResource($this->createdBy),
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'updatedBy' => new UserResource($this->updatedBy),
            'updated_at' => (new Carbon($this->updated_at))->format('Y-m-d'),
        ];
    }
}
