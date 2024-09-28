<?php
namespace App\Http\Actions\Ads;



//models
use App\Models\AdvertCategory;
use App\Models\AdvertToCategory;
use App\Models\AdvertToLocation;
use App\Models\Advert;

//request
use App\Http\Requests\Ads\UploadAdvertRequest;

//resources
use App\Http\Resources\Ads\CategoryResource;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class UploadAdvert {

    public function handle(UploadAdvertRequest $request) {

        try {

            Log::info("recieved request to upload advert", safeRequest($request));

            $advert = $request->file("file")->store("advert/adverts", "public");

            $endDate    = Carbon::parse($request->endDate)->format('Y-m-d H:i:s');
            $startDate  = Carbon::parse($request->startDate)->format('Y-m-d H:i:s');

            $advert = Advert::create([
                'title'         => $request->title,
                'description'   => $request->description,
                'advert'        => $advert,
                'aspect_ratio'  => $request->ratio,
                'gender'        => $request->gender,
                'end_date'      => $endDate,
                'start_date'    => $startDate,
                'start_age'     => $request->startAge,
                'end_age'       => $request->endAge,
                'user_id'       => auth()->user()->id,
                'profile_id'    => $request->profileId,
                'reference'     => $request->reference,
            ]);

            foreach( $request->locations as $location ) {
                AdvertToLocation::create([
                    "advert_id" => $advert->id,
                    "name"      => $location['name'],
                    "lat"       => $location['lat'],
                    "lng"       => $location['lng'],
                    "radius"    => $location['radius'],
                ]);
            }

            foreach( $request->categories as $category ) {
                AdvertToCategory::create([
                    "advert_id" => $advert->id,
                    "category_id" => $category['id'],
                ]);
            }

            Log::info("advert uploaded successfully", safeRequest($request));


            return successResponse([
                'message'    => "Advert uploaded successfully",
            ]);
        }
        catch (\Exception $e) {
            report($e);
            return errorResponse();
        }
        
    }


}
