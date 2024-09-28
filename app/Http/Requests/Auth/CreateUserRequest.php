<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class CreateUserRequest extends FormRequest
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
            "first_name"              => ["required"],
            "last_name"               => ["required"],
            "email"                   => ["required", "unique:users,email"],
            "contact"                 => ["required", "unique:users,contact"],
            "dob"                     => ["required"],
            "gender"                  => ["required"],
            "location"                => ["required"],
            "password"                => ["required"],
            "password_confirmation"   => ["required"],
            "terms"                   => ["required", "accepted"],
        ];
    }
}
