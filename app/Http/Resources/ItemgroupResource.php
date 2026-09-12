<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;


class ItemgroupResource extends JsonResource
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
            'position' => $this->position,
            'name' => $this->name,
            'sub1' => $this->sub1,
            'sub2' => $this->sub2,
            'main' => $this->main,
            'mainpos' => $this->mainpos,
            'sub1pos' => $this->sub1pos,
            'sub2pos' => $this->sub2pos,
            'status' => $this->status,
            'level' => $this->level,
            'parent_id' => $this->parent_id,
            'image_path' => $this->image_path,
            'created_by' => $this->created_by,
            'updated_by' => $this->updated_by,
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'updated_at' => (new Carbon($this->updated_at))->format('Y-m-d'),
        ];
    }
}
