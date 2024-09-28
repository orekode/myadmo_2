<?php
namespace App\Http\Actions\Profile;

use Illuminate\Support\Facades\Log;
use App\Models\AdvertiserProfile;
use App\Http\Resources\ProfileResource;

use App\Http\Requests\Profile\CreateProfileRequest;


class CreateProfile {

    public function handle(CreateProfileRequest $request) {

        try {
            Log::info("recieved request to create an advertiser profile", safeRequest($request));

            $coverImage = $request->file("coverImage")->store("uploads/{$request->user()->email}/cover", "public");
            $logo = $request->file("logo")->store("uploads/{$request->user()->email}/logo", "public");
            
            $profile = AdvertiserProfile::create([
                "cover_image" => $coverImage,
                "logo"        => $logo,
                "name"        => $request->name,
                "email"       => $request->email,
                "contact"     => $request->contact,
                "bio"         => $request->bio,
                "user_id"     => $request->user()->id,
            ]);

            Log::info("profile created successfully", [$profile]);

            return successResponse([
                "profile" => new ProfileResource($profile)
            ]);

        }
        catch (\Exception $e) {
            report($e);
            return errorResponse();
        }
        
    }
}