<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use App\Enums\UserRole;
use App\Enums\UserStatus;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'role' => ['required', 'string', Rule::in(UserRole::cases())],
            'status' => ['required', 'string', Rule::in(UserStatus::cases())],
            'avatarFile' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        //dd($request);

        $fileName = $request->file('avatarFile')->getClientOriginalName();
        $path = $request->file('avatarFile')->storeAs('avatars', $fileName, 'public');
        $url_main = 'http://localhost:8000/storage/';
        $fullPath = $url_main . $path;
        $request->image_path = $fullPath;

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'first_name' => $request['first_name'],
            'last_name' => $request->last_name,
            'phone' => $request->phone,
            'role' => $request->role,
            'status' => $request->status,
            'avatar' => $request->image_path,
            'remember_token' => $request->remember_token,
            'pass_updated_at' => now(),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return to_route('dashboard');
    }
}
