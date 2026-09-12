<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserResource;

class QuestionResource extends JsonResource
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
            'survey_id' => $this->survey_id,
            'question_pos' => $this->question_pos,
            'question' => $this->question,
            'answer_type' => $this->answer_type,
            'answer' => $this->answer,
            'extra_field' => $this->extra_field,
            'label_for_extra' => $this->label_for_extra,
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'updatedBy' => new UserResource($this->updatedBy),
            'updated_at' => (new Carbon($this->updated_at))->format('Y-m-d'),
        ];
    }
}
