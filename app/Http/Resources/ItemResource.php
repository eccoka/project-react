<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;



class ItemResource extends JsonResource
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
            'groupId' =>$this->groupId,
            'brandId' => $this->brandId,
            'group' => $this->group,
            'brand' => $this->brand,
            'barcode' => $this->barcode,
            'website' => $this->website,
            'parameter_ids' => $this->parameter_ids,            
            'name' => $this->name,
            'description' => $this->description,
            'status' => $this->status,
            'price' => $this->price,
            'discount' => $this->discount,
            'unit' => $this->unit,
            'created_by' => $this->created_by,
            'updated_by' => $this->updated_by,
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'updated_at' => (new Carbon($this->updated_at))->format('Y-m-d'),
        ];
    }
}
