<?php

namespace App\Http\Requests\Settings;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
/*         return [
            'name' => ['required', 'string', 'max:100'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
            'phone' => ['string', 'max:20', 'required'],
            'avatarFile' => ['nullable', 'image', 'mimes:jpg,jpeg,png,gif', 'max:2048'],
        ]; */

        return [
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:255|unique:users,email,' . $this->user()->id,
            'phone' => 'required|string|max:20',
            'avatarFile' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];
    }
}
