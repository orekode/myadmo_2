<?php
use Illuminate\Support\Facades\Log;

function safeRequest($request) {

    $result = $request->all();
    $result["password"] = "";
    $result["confirm_password"] = "";
    $result["token"] = "";

    return $result;

}

function successResponse($data=[]) {

    return response()->json([
        "success" => true,
    ] + $data);

}

function errorResponse($data=[]) {

    return response()->json(array_merge([
        "success" => false,
        "type"    => "error",
        "message" => "There was an error proccessing your request, please try again later.",
    ], $data));

}

function paginationNav($collection) {
    return [
        "perPage"     => $collection->perPage(),
        "lastPage"    => $collection->lastPage(),
        "currentPage" => $collection->currentPage()
    ];
}

function getCoordinates($request) {

    $ip = $request->ip();

    // In development, localhost IP can cause issues. So use a placeholder if on localhost.
    if ($ip == '127.0.0.1' || $ip == '::1') {
        $ip = '8.8.8.8'; // Google DNS IP for testing
    }

    // Use ipapi or ipstack API
    $apiKey = 'your_api_key'; // Replace with your API key
    $response = Http::post("http://ipapi.co/{$ip}/json");

    // Check if the request was successful
    if ($response->successful()) {
        $data = $response->json();
        Log::info($response);
        return [
            'latitude' => $data['latitude'],
            'longitude' => $data['longitude'],
        ];
    }

    return false;
}