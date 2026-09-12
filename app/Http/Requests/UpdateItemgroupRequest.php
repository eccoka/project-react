<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateItemgroupRequest extends FormRequest
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
            'position' => ['nullable', 'integer'],
            'name' => ['nullable', 'string', 'min:3', 'max:100'],
            'status' => ['nullable', 'in:active,inactive'],
            'level' => ['nullable', 'integer'],
            'parent' => ['nullable', 'string'],
            'imageFile' => ['nullable', 'file', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
        ];
    }
}
