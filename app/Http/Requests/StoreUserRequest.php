<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\Rules\Unique;
use Illuminate\Validation\Rules\Enum;
use App\Enums\UserRole;
use App\Enums\UserStatus;
use Illuminate\Validation\Rule;

class StoreUserRequest extends FormRequest
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
            'email' => ['required', 'email', 'unique:users,email', 'max:255'],
            'name' => [
                'required',
                'string',
                'min:3',
                'max:100',
                Rule::unique('users')->ignore($this->user),
            ],
            'first_name' => ['nullable', 'string', 'min:3', 'max:100'],
            'last_name' => ['nullable', 'string', 'min:3', 'max:100'],
            'phone' => ['nullable', 'string', 'max:15'],
            'status' => ['required', Rule::in(UserStatus::class)],
            'role' => ['required', Rule::in(UserRole::class)],
            'password' => ['required', 'string', 'confirmed', Password::min(8)->mixedCase()->numbers()],
        ];
    }
}
