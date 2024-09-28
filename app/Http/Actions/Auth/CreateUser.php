<?php

namespace App\Http\Actions\Auth;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Events\Registered;
use App\Http\Requests\Auth\CreateUserRequest;
use App\Models\User;

class CreateUser {

    public function handle(CreateUserRequest $request) {

        try {
            Log::info("recieved request to create new user", safeRequest($request));

            $lat = $request->lat;
            $lng = $request->lng;

            if((!$lat or !$lng) and $location = getCoordinates($request)) {
                $lat = $location['latitude'];
                $lng = $location['longitude'];
            }

            $user = User::create([
                "first_name" => $request->first_name,
                "last_name"  => $request->last_name,
                "email"      => $request->email,
                "contact"    => $request->contact,
                "dob"        => $request->dob,
                "gender"     => $request->gender,
                "location"   => $request->location,
                "password"   => Hash::make($request->password),
                "lat"        => $lat,
                "lng"        => $lng,
            ]);

            event(new Registered($user));

            Auth::guard('web')->login($user);

            Log::info("user created successfully", safeRequest($request));

            return successResponse([
                "token" => $user->createToken('auth-token'),
            ]);

        }
        catch (\Exception $e) {

            report($e);

            return errorResponse();

        }
        
    }
}