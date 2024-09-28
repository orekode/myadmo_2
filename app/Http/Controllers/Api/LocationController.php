<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Actions\Location\GetLocations;

class LocationController extends Controller
{
    public function getLocations(GetLocations $action) {
        return $action->handle();
    }
}
