<?php

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateProfileRequest extends FormRequest
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
            "coverImage"  => ["required", "max:2048"],
            "logo"        => ["required", "max:2048"],
            "name"        => ["required",             Rule::unique('advertiser_profiles')->where(function ($query) {
                return $query->where('user_id', $this->user()->id);
            })],
            "email"       => ["required"],
            "contact"     => ["required"],
            "bio"         => ["required"],
        ];
    }

    public function messages(): array
    {
        return [
            "coverImage.required" => "Upload a cover image to create this profile",
            "logo.required" => "Upload a logo to create this profile",
            "name.unique" => "A profile with this name already exists",
        ];
    }
}
