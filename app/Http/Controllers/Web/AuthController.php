<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Http\Actions\Auth\LoginUser;
use App\Http\Actions\Auth\LogoutUser;
use App\Http\Actions\Auth\CreateUser;
use App\Http\Actions\Auth\VerifyEmail;
use App\Http\Actions\Auth\SendResetLink;
use App\Http\Actions\Auth\ResetPassword;
use App\Http\Actions\Auth\ResendVerifyLink;
use App\Http\Actions\Location\GetLocations;

use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Http\Requests\Auth\SendResetLinkRequest;
use App\Http\Requests\Auth\CreateUserRequest;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

class AuthController extends Controller
{
    public function signupForm(GetLocations $action) {

        return Inertia::render('Auths/Signup', [
            'locations' => $action->handle(true),
        ]);
    }

    public function signup(CreateUser $action, CreateUserRequest $request) {
       
        $response = json_decode($action->handle($request)->getContent());

        if(!$response->success) {
            return redirect()->back()->withErrors([
                'type'  => $response->type,
                'error' => $response->message
            ])->withInput();
        }

        return redirect(route('verification.notice'));
    }

    public function loginForm() {
        return Inertia::render('Auths/Login', []);
    }

    public function login(LoginUser $action, LoginRequest $request) {

        $response = json_decode($action->handle($request)->getContent());

        if(!$response->success) {
            return redirect()->back()->withErrors([
                'type'  => $response->type,
                'error' => $response->message
            ])->withInput();
        }

        return Inertia::render('Auths/Login', [
            "token" => $response->token,
        ]);

    }


    public function logout(LogoutUser $action, Request $request) {

        $response = json_decode($action->handle($request)->getContent());


        if(!$response->success) {
            return redirect()->back()->withErrors([
                'type'  => $response->type,
                'error' => $response->message
            ])->withInput();
        }

        return redirect(route('Dashboard'));
    }

    public function verifyEmail(Request $request) {


        if(!$request->user()->hasVerifiedEmail())
            return Inertia::render('Auths/Verify', []);

        return redirect(route('home'));
    }

    public function verify(VerifyEmail $action, EmailVerificationRequest $request) {

        $response = json_decode($action->handle($request)->getContent());


        if(!$response->success) {
            return redirect()->back()->withErrors([
                'type'  => $response->type,
                'error' => $response->message
            ])->withInput();
        }

        return redirect(route('home'));
    }

    public function reVerify(ResendVerifyLink $action, Request $request) {

        $response = json_decode($action->handle($request)->getContent());

        if(!$response->success) {
            return redirect()->back()->withErrors([
                'type'  => $response->type,
                'error' => $response->message
            ])->withInput();
        }

        return redirect()->back()->with(["prompt" => "Verification Link Sent"]);
    }

    public function forgotForm() {
        return Inertia::render('Auths/Forgot', []);
    }

    public function sendLink(SendResetLink $action, SendResetLinkRequest $request) {

        $response = json_decode($action->handle($request)->getContent());


        if(!$response->success) {
            return redirect()->back()->withErrors([
                'type'  => $response->type,
                'error' => $response->message
            ])->withInput();
        }

        return redirect(route('linksent.success'));
    }

    public function success() {
        return Inertia::render('Auths/Success', [
            "title"     => "Reset Link Sent Successfully",
            "content"   => "An email with a password reset link has been sent to your inbox. Please click the link to reset your password.",
            "sent"      => true,
        ]);
    }

    public function resetForm(Request $request) {
        $email = $request->query('email');
        $token = $request->query('token');

        return Inertia::render('Auths/Reset', [
            "email" => $email,
            "token" => $token,
        ]);
    }

    public function reset(ResetPassword $action, ResetPasswordRequest $request) {

        $response = json_decode($action->handle($request)->getContent());

        if(!$response->success) {
            return redirect()->back()->withErrors([
                'type'  => $response->type,
                'error' => $response->message
            ])->withInput();
        }

        return redirect(route('login'));
    }


}
