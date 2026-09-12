<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SurveyResource extends JsonResource
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
            'title' => $this->title,
            'description' => $this->description,
            'usage' => $this->usage,
            'image_path' => $this->image_path,
            'visible' => $this->visible,
            'createdBy' => new UserResource($this->createdBy),
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'updatedBy' => new UserResource($this->updatedBy),
            'updated_at' => (new Carbon($this->updated_at))->format('Y-m-d'),
            'expire_at' => (new Carbon($this->expire_at))->format('Y-m-d'),
        ];
    }
}
