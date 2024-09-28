<?php
namespace App\Http\Actions\Ads;


use App\Models\AdvertCategory;
use App\Http\Resources\Ads\CategoryResource;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\Ads\GetAdvertCostRequest;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class GetAdvertCost {

    public function handle(GetAdvertCostRequest $request) {

        try {

            Log::info("recieved request to calculate advert cost", safeRequest($request));

            $duration  = $request->duration ?? env('BASE_VIDEO_DURATION');
            $startDate = Carbon::parse($request->startDate);
            $endDate   = Carbon::parse($request->endDate);
            $days      = $startDate->diffInDays($endDate);

            $cost = $this->calculateAdvertCost((object) [
                'videoDuration'  => $duration,
                'advertDuration' => $days, //THE NUMBER OF DAYS IT WOULD RUN
                'numCategories'  => count($request->categories),
                'numLocations'   => count($request->locations),
                'locations'      => $request->locations,
                'numAgeGroups'   => $request->startAge - $request->endAge,
                'estimatedUsers' => $this->nearbyUsers($request->locations),
            ]);

            Log::info("advert cost calculated successfully", [...safeRequest($request), "cost" => $cost]);


            return successResponse([
                'message'    => "Category retrieved successfully",
                "cost" => $cost,
            ]);
        }
        catch (\Exception $e) {
            report($e);
            return errorResponse();
        }
        
    }


    /**
     * Calculates the cost of an advert.
     *
     * @param GetAdvertCostRequest $request - The Laravel request object with validated data.
     * @return float - The total cost of the advert.
     */
    public function calculateAdvertCost($advert) {
        
        // Access parameters directly from the request
        $baseCost                   = env("ADVERT_BASE_COST");
        $videoDuration              = $advert->videoDuration;  // THE DURATION OF THE ADVERT MEDIA ITSELF
        $advertDuration             = $advert->advertDuration; //THE NUMBER OF DAYS IT WOULD RUN
        $numCategories              = $advert->numCategories;
        $numLocations               = $advert->numLocations;
        $numAgeGroups               = $advert->numAgeGroups;
        $estimatedUsers             = $advert->estimatedUsers;

        $coverageArea = array_reduce($advert->locations, function ($carry, $item) {
            return $carry + $item['radius'];
        }, 0);

        // Calculate each factor
        $durationFactor         = env('ADVERT_VIDEO_COEFFICIENT')       * ($videoDuration  / env('BASE_VIDEO_DURATION') );
        $advertDurationFactor   = env('ADVERT_DURATION_COEFFICIENT')    * ($advertDuration / env('BASE_ADVERT_DURATION') );
        $categoryFactor         = env('ADVERT_CATEGORY_COEFFICIENT')    * ($numCategories  / env('BASE_CATEGORIES') );
        $locationFactor         = env('ADVERT_LOCATION_COEFFICIENT')    * ($numLocations   / env('BASE_LOCATIONS') );
        $coverageAreaFactor     = env('ADVERT_AREA_COEFFICIENT')        * ($coverageArea   / env('BASE_COVERAGE_AREA') );
        $ageGroupFactor         = env('ADVERT_AGEGROUP_COEFFICIENT')    * ($numAgeGroups   / env('BASE_AGE_GROUP') );
        $userEstimateFactor     = env('ADVERT_VIDEO_COEFFICIENT')       * ($estimatedUsers / env('BASE_ESTIMATED_USER') );

        // Calculate total cost
        $totalCost = $baseCost * (1 + $durationFactor + $advertDurationFactor + $categoryFactor + $locationFactor + $coverageAreaFactor + $ageGroupFactor + $userEstimateFactor);

        return $totalCost;
    }


    public function nearbyUsers($locations)
    { // Array of locations with lat, lng, and radius

        // Initialize the query builder
        $query = DB::table('users');

        foreach ($locations as $location) {
            $lat    = $location['lat'];
            $lng    = $location['lng'];
            $radius = $location['radius'] / 1000; // Convert radius to kilometers

            // Add a where clause to filter users by proximity
            $query->orWhereRaw("
                6371 * acos(cos(radians(?)) * cos(radians(users.lat)) * cos(radians(users.lng) - radians(?)) + sin(radians(?)) * sin(radians(users.lat))) <= ?
            ", [$lat, $lng, $lat, $radius]);
        }

        // Execute the query and get the users
        $users = $query->count();

        return $users;
    }


}
