<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Contracts\Validation\Validator;

class UpdateSurveyRequest extends FormRequest
{
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
            "title" => ['required', 'string', 'max:255'],
            "description" => ['nullable', 'string', 'max:1000'],
            "usage" => ['required', Rule::in(['public', 'private'])],
            "expire_at" => ['required', 'date', 'after:today'],
        ];
    }
    protected function failedValidation(Validator $validator)
    {
        $errors = $validator->errors();
        foreach ($errors->messages() as $error) {
            $message = implode(' ', $error);
            if (str_contains($message, 'after')) {
                $errorText = "Wrong date!";
            }
            else {
                $errorText = $message;
            }
        }
        return redirect()->back()->with('error', $errorText);
    }
}
