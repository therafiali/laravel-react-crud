<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    public function redirectToGoogle () 
    {
        return Socialite::driver('google') -> redirect();
    }

    public function handleGoogleCallback ()
    {
        try {
            $googleUser  = Socialite::driver('google') -> user();

            $user = User::updateOrCreate(
                [ "email"  => $googleUser->email ],
                [
                    "name" => $googleUser -> name,
                    'google_id' => $googleUser->id,
                    'google_token' => $googleUser->token,
                    'google_refresh_token' => $googleUser->refreshToken,                
                ]
            );

            Auth::login($user);

            return redirect() -> intended('/about');

        } catch (\Exception $e) {
              return redirect('/login')->with('error', 'Google login failed: ' . $e->getMessage());
        }
    }
}
