<?php
namespace App\Http\Actions\Profile;

use Illuminate\Support\Facades\Log;
use App\Models\AdvertiserProfile;
use App\Http\Resources\ProfileResource;

use App\Http\Requests\Profile\GetUserProfilesRequest;


class GetUserProfiles {

    public function handle(GetUserProfilesRequest $request) {

        try {

            Log::info("recieved request to retrieved an advertiser's profiles", safeRequest($request));
            
            $profiles = AdvertiserProfile::where("user_id", $request->user()->id)->paginate();

            Log::info("profiles retrieved successfully", safeRequest($request));


            return successResponse([
                "profiles" => ProfileResource::collection($profiles)
            ]);

        }
        catch (\Exception $e) {
            report($e);
            return errorResponse();
        }
        
    }
}