{{-- resources/views/emails/password_reset.blade.php --}}
    @component('mail::message')
    # Account Verification OTP

    Hello $name,

    Welcome to Myadmo, use the code provided bellow to verify your account.

    @component('mail::button', ['url' => ''])
        $otp
    @endcomponent

    This OTP will expire in {{ config('auth.passwords.'.config('auth.defaults.passwords').'.expire') }} minutes.

    If you did not create an account , no further action is required.

    Thanks,<br>
    {{ config('app.name') }}
@endcomponent
