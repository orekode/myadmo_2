<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

// actions
use App\Http\Actions\Ads\GetCategories;
use App\Http\Actions\Ads\GetAdvertCost;
use App\Http\Actions\Ads\UploadAdvert;
use App\Http\Actions\Payment\VerifyPayment;

// requests
use App\Http\Requests\Ads\GetCategoriesRequest;
use App\Http\Requests\Ads\GetAdvertCostRequest;
use App\Http\Requests\Ads\UploadAdvertRequest;
use App\Http\Requests\Payment\VerifyPaymentRequest;

class AdController extends Controller
{
    public function getCategories(GetCategories $action, GetCategoriesRequest $request) {
        return $action->handle($request);
    }

    public function getAdvertCost(GetAdvertCost $action, GetAdvertCostRequest $request) {
        return $action->handle($request);
    }

    public function verifyPayment(VerifyPayment $action, VerifyPaymentRequest $request) {
        return $action->handle($request);
    }

    public function uploadAdvert(UploadAdvert $action, UploadAdvertRequest $request) {
        return $action->handle($request);
    }
}
