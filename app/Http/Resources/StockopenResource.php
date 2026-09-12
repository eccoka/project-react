<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;
use App\Http\Resources\UserResource;
use App\Http\Resources\StockResource;

class StockopenResource extends JsonResource
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
            'stock_id' => new StockResource($this->stock),
            'open_time_mo' => $this->open_time_mo,
            'close_time_mo' => $this->close_time_mo,
            'open_time_tu' => $this->open_time_tu,
            'close_time_tu' => $this->close_time_tu,
            'open_time_we' => $this->open_time_we,
            'close_time_we' => $this->close_time_we,
            'open_time_th' => $this->open_time_th,
            'close_time_th' => $this->close_time_th,
            'open_time_fr' => $this->open_time_fr,
            'close_time_fr' => $this->close_time_fr,
            'open_time_sa' => $this->open_time_sa,
            'close_time_sa' => $this->close_time_sa,
            'open_time_su' => $this->open_time_su,
            'close_time_su' => $this->close_time_su,
            'created_by' => new UserResource($this->createdBy),
            'updated_by' => new UserResource($this->updatedBy),
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'updated_at' => (new Carbon($this->updated_at))->format('Y-m-d'),
        ];
    }
}
