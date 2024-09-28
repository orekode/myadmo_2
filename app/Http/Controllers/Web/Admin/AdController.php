<?php

namespace App\Http\Controllers\Web\Admin;

use App\Http\Controllers\Controller;

// actions
use App\Http\Actions\Ads\Admin\CreateCategory;

// requests
use Illuminate\Http\Request;
use App\Http\Requests\Ads\Admin\CreateCategoryRequest;

class AdController extends Controller
{
    public function createCategory(CreateCategory $action, CreateCategoryRequest $request) {

        $response = json_decode($action->handle($request)->getContent());


        if(!$response->success) {
            return redirect()->back()->withErrors([
                'type'  => $response->type,
                'error' => $response->message
            ])->withInput();
        }

        return redirect()->back()->with(["success" => "Category Created Successfully"]);
    }
}
