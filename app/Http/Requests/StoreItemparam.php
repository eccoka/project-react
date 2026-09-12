<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreItemparam extends FormRequest
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
            'parent_groupid' => 'required|exists:item_groups,id',
            'param_name' => 'required|string|max:255',
            'value' => 'required|string|max:255',
            'status' => 'required|in:active,inactive',
            'created_by' => 'required|exists:users,id',
        ];
    }
}
