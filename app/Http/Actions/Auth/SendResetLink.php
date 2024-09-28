<?php

namespace App\Http\Actions\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;

use App\Http\Requests\Auth\SendResetLinkRequest;


class SendResetLink {

    public function handle(SendResetLinkRequest $request) {

        try {
            Log::info("recieved request to send password reset link", safeRequest($request));

            $status = Password::sendResetLink(
                $request->only('email')
            );
         
            if($status !== Password::RESET_LINK_SENT and $status !== Password::RESET_THROTTLED) {

                Log::info("reset link could not be sent", ["status" => $status, "here" => Password::RESET_LINK_SENT]);

                return errorResponse([
                    'message' => __($status)
                ]);

            }

            Log::info("reset link sent successfully", ["status" => $status]);

            return successResponse([
                'message' => __($status)
            ]);

        }
        catch (\Exception $e) {
            report($e);
            return errorResponse();

        }
        
    }
}