<?php
namespace App\Http\Actions\Auth;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class ResendVerifyLink {

    public function handle(Request $request) {

        try {
            Log::info("recieved request to resend email verification link", [safeRequest($request)]);
         
            $request->user()->sendEmailVerificationNotification();

            Log::info("verification link sent successfully", []);

            return successResponse([
                'message' => "Email verification link sent successfully"
            ]);

        }
        catch (\Exception $e) {
            report($e);
            return errorResponse([
                "message" => "Unable to resend email verification link at this time, please try again later"
            ]);
        }
        
    }
}