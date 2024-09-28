<?php

namespace App\Http\Actions\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;


class LogoutUser {

    public function handle(Request $request) {

        try {
            Log::info("recieved request to log user out", safeRequest($request));

            if(! (auth()->user()->token()->revoke() && auth()->logout()) ) {
                throw new \Exception("Unable to log user out");
            }

            return successResponse();

        }
        catch (\Exception $e) {
            report($e);
            return errorResponse(["message" => "Unable to log out, please try again later"]);

        }
        
    }
}