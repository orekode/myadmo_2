<?php
namespace App\Http\Actions\Ads;


use App\Models\AdvertCategory;
use App\Http\Resources\Ads\CategoryResource;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\Ads\GetCategoriesRequest;

class GetCategories {

    public function handle(GetCategoriesRequest $request) {

        try {
            Log::info("recieved request to retrieve advert categories", safeRequest($request));

            $categories = AdvertCategory::filter()->sort()->paginate();

            Log::info("advert categories retrieved successfully", safeRequest($request));


            return successResponse([
                'message'    => "Category retrieved successfully",
                "categories" => CategoryResource::collection($categories),
                ...paginationNav($categories),
            ]);
        }
        catch (\Exception $e) {
            report($e);
            return errorResponse();
        }
        
    }

}
