<?php
namespace App\Http\Actions\Auth;


use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\Log;


class VerifyEmail {

    public function handle(EmailVerificationRequest $request) {

        try {
            Log::info("recieved request to verify email", safeRequest($request));
         
            if(!$request->fulfill()) {
                return errorResponse([
                    "message" => "Unable to verify email at this time, please try again later"
                ]);
            }

            Log::info("email verified successfully", ["status" => $status]);

            return successResponse([
                'message' => "Email verified successfully"
            ]);

        }
        catch (\Exception $e) {
            report($e);
            return errorResponse();
        }
        
    }
}
