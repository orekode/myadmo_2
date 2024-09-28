<?php

namespace App\Http\Actions\Payment;

use Illuminate\Support\Facades\Log;
use App\Http\Requests\Payment\VerifyPaymentRequest;
use Illuminate\Support\Facades\Http;


class VerifyPayment {

    public function handle(VerifyPaymentRequest $request) {

        try {

            Log::info("recieved request to verify payment", safeRequest($request));

            if (!$this->verifyTransaction($request->reference)) {
                throw new Exception("Unable to verify payment");
            }

            Log::info("payment verified successfully", safeRequest($request));

            return successResponse([
                'message'    => "Payment verified successfully",
            ]);
        }
        catch (\Exception $e) {
            report($e);
            return errorResponse();
        }
        
    }

    public function verifyTransaction($reference) {

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('PAYSTACK_SECRET_KEY'),
            'Cache-Control' => 'no-cache',
        ])->get("https://api.paystack.co/transaction/verify/{$reference}");


        if ($response->successful()) {
            // Process the response
            Log::info($response['data']);
            return $response['data']['status'] == "success";
        } else {
            // Handle the error
            return false;
        }
    }

}
