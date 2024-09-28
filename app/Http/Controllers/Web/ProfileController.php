<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;

// actions
use App\Http\Actions\Profile\CreateProfile;
use App\Http\Actions\Profile\GetUserProfiles;

// requests
use Illuminate\Http\Request;
use App\Http\Requests\Profile\CreateProfileRequest;
use App\Http\Requests\Profile\GetUserProfilesRequest;


use Inertia\Inertia;


class ProfileController extends Controller
{
    

    public function profile() {
        return Inertia::render('Profile/Profile', []);
    }

    public function chooseProfile(GetUserProfiles $action, GetUserProfilesRequest $request) {

        $response = json_decode($action->handle($request)->getContent());

        return Inertia::render('Profile/Choose', [
            "type"     => $response->type ?? null,
            "message"  => $response->message ?? null,
            "profiles" => $response->profiles,
        ]);
    }

    public function createProfile() {
        return Inertia::render('Profile/Create', []);
    }

    public function create(CreateProfile $action, CreateProfileRequest $request) {
        $response = json_decode($action->handle($request)->getContent());

        if(!$response->success) {
            return redirect()->back()->withErrors([
                'type'  => $response->type,
                'error' => $response->message
            ])->withInput();
        }

        return redirect(route('profile.choose'));
    }

}
