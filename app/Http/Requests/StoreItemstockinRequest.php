<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreItemstockinRequest extends FormRequest
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
            'item_id' => 'required|exists:items,id',
            'stock_code' => 'required|exists:stocks,stock_code',
            'stock_in' => 'required|integer|min:1',
            'deliveryNote_in' => 'nullable|string|max:255',
            'invoice_in' => 'nullable|string|max:255',
            'created_by' => 'required|exists:users,id',
        ];
    }
}
