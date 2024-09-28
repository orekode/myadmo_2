<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;

// actions
use App\Http\Actions\Profile\GetUserProfiles;


// requests
use Illuminate\Http\Request;
use App\Http\Requests\Profile\GetUserProfilesRequest;


use Inertia\Inertia;

class AdController extends Controller
{
    public function createAdvert(GetUserProfiles $action, GetUserProfilesRequest $request) {

        $response = json_decode($action->handle($request)->getContent());

        return Inertia::render('Ads/Create', [
            "type"     => $response->type ?? null,
            "message"  => $response->message ?? null,
            "profiles" => $response->profiles,
        ]);
    }

    public function getCategories(GetCategories $action, GetCategoriesRequest $request) {
        
        $response = json_decode($action->handle($request)->getContent());

        if(!$response->success) {
            return redirect()->back()->withErrors([
                'type'  => $response->type,
                'error' => $response->message
            ])->withInput();
        }

        return redirect(route('login'));
    }


}
