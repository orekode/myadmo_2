<?php

namespace App\Http\Requests\Ads\Admin;

use Illuminate\Foundation\Http\FormRequest;

class CreateCategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->role == "admin";
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name"      => ["required", "unique:advert_categories,name"],
            "image"     => ["required", "max:2048"],
            "parent"    => ["exists:advert_categories,id"],
        ];
    }
}
