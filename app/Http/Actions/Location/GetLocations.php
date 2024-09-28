<?php

namespace App\Http\Actions\Location;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Models\Location;
use App\Http\Resources\LocationResource;

class GetLocations {

    public function handle($web=false) {

        try {
            Log::info("recieved request to get all locations");

            $locations = Location::all();

            if($web) return $locations;

            return successResponse([
                "locations" => LocationResource::collection($locations)
            ]);

        }
        catch (\Exception $e) {
            report($e);
            return errorResponse();
        }
        
    }
}