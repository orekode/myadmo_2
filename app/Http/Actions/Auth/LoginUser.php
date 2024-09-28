<?php

namespace App\Http\Actions\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;


class LoginUser {

    public function handle(LoginRequest $request) {

        try {

            Log::info("recieved request to log user into an account", safeRequest($request));

            if(!Auth::guard('web')->attempt(["email" => $request->email, "password" => $request->password])) {
                return errorResponse([
                    "type" => "warning",
                    "message" => "Invalid credentials, please check your inputs and try again"
                ]);
            }

            Log::info("user login successful: ", safeRequest($request));

            $user = User::where("email", $request->email)->first();

            if($request->lat && $request->lng) {
                $user->update([
                    'lat' => $request->lat,
                    'lng' => $request->lng,
                ]);
            }

            return successResponse([
                "token" => $user->createToken('auth-token')
            ]);

        }
        catch (\Exception $e) {
            report($e);
            return errorResponse([
                "message" => "Unable to log into your account at this time, please try again later"
            ]);
        }
        
    }
}