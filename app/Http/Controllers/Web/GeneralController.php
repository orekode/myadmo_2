<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;


use App\Http\Actions\Location\GetLocations;



class GeneralController extends Controller
{
    public function home(Request $request) {

        return Inertia::render('Home', [
            'user' => $request->user(),
        ]);

    }

 


}
