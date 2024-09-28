<?php
namespace App\Http\Actions\Auth;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;

use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Models\User;


class ResetPassword {


    public function handle(ResetPasswordRequest $request) {
        try {
            Log::info("recieved request to reset password", safeRequest($request));

            $check = Hash::check($request->token, DB::table('password_reset_tokens')->where("email", $request->email)->first()->token);

            // dd($request->only('email', 'password', 'password_confirmation', 'token'), ["check" => $check]);

            $status = Password::reset(
                $request->only('email', 'password', 'password_confirmation', 'token'),
                function (User $user, string $password) {
                    $user->forceFill([
                        'password' => Hash::make($password)
                    ])->setRememberToken(Str::random(60));
         
                    $user->save();
         
                    event(new PasswordReset($user));
                }
            );

            // dd($status, "I got here", Password::PASSWORD_RESET, $status !== Password::PASSWORD_RESET);
            
         
            if($status !== Password::PASSWORD_RESET) {

                Log::info("password could not be reset", ["status" => $status]);

                return errorResponse([
                    'message' => __($status)
                ]);

            }

            Log::info("password reset successfully", ["status" => $status]);

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