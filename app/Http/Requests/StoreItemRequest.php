<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreItemRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "brand" => "required|exists:brands,id",
            "barcode" => "nullable|unique:items,barcode",
            "name" => "required|string|min:5|max:255",
            "website" => "nullable|url",
//            "parameter_ids" => "nullable|array",
//            "parameter_ids.*" => "exists:itemparams,id",
            "descriptionFile" => "nullable|file|mimes:txt|max:2048",
            "status" => "required|in:active,inactive",
            "price" => "required|numeric|min:0",
            "discount" => "nullable|numeric|min:0|max:100",
            "unit" => "required|numeric",
            // A paramids mezőt engedélyezni kell, mert ezt küldi a paramsetup form
            "paramids" => "nullable|array",
            "paramids.*" => "exists:itemparams,id",
        ];
    }
}
