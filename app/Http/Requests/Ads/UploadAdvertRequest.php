<?php

namespace App\Http\Requests\Ads;

use Illuminate\Foundation\Http\FormRequest;

class UploadAdvertRequest extends FormRequest
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
            'title'             => ['required'],
            'description'       => ['required'],
            'ratio'             => ['required'],
            'gender'            => ['required'],
            'endDate'           => ['required'],
            'startDate'         => ['required'],
            'startAge'          => ['required'],
            'endAge'            => ['required'],
            'profileId'         => ['required'],
            'locations'         => ['required'],
            'locations.*'       => ['array:name,lat,lng,radius'],
            'categories'        => ['required'],
            'categories.*.id'   => ['required', 'exists:advert_categories,id'],
        ];
    }
}
