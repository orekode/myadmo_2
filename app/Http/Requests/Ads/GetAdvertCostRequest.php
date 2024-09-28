<?php

namespace App\Http\Requests\Ads;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class GetAdvertCostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return True;
        return Auth::guard('web')->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'file'          => 'required|file',
            'startDate'     => 'required|date',
            'endDate'       => 'required|date',
        ];
    }

    // public function attributes()
    // {
    //     return [
    //         'baseCost' => 'base cost',
    //         'videoDuration' => 'video duration',
    //         'baseVideoDuration' => 'base video duration',
    //         'videoDurationCoefficient' => 'video duration coefficient',
    //         'advertDuration' => 'advert duration',
    //         'baseAdvertDuration' => 'base advert duration',
    //         'advertDurationCoefficient' => 'advert duration coefficient',
    //         'numCategories' => 'number of categories',
    //         'baseCategories' => 'base number of categories',
    //         'categoriesCoefficient' => 'categories coefficient',
    //         'numLocations' => 'number of locations',
    //         'baseLocations' => 'base number of locations',
    //         'locationsCoefficient' => 'locations coefficient',
    //         'coverageArea' => 'coverage area',
    //         'baseCoverageArea' => 'base coverage area',
    //         'coverageAreaCoefficient' => 'coverage area coefficient',
    //         'numAgeGroups' => 'number of age groups',
    //         'baseAgeGroups' => 'base number of age groups',
    //         'ageGroupsCoefficient' => 'age groups coefficient',
    //         'estimatedUsers' => 'estimated users',
    //         'baseEstimatedUsers' => 'base estimated users',
    //         'usersCoefficient' => 'users coefficient',
    //     ];
    // }
}
