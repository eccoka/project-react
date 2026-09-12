<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StockResource extends JsonResource
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
            'stock_name' => $this->stock_name,
            'stock_code' => $this->stock_code,
            'address' => $this->address,
            'phone' => $this->phone,
            'email' => $this->email,
            'image' => $this->image,
            'status' => $this->status,
            'createdBy' => new UserResource($this->createdBy),
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'updatedBy' => new UserResource($this->updatedBy),
            'updated_at' => (new Carbon($this->updated_at))->format('Y-m-d'),
        ];
    }
}
