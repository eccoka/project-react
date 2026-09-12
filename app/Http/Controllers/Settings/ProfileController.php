<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Services\ImageService;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('settings/profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $oldImagePath = User::query()->where('id', $request->user()->id)->pluck('avatar')->first();

        if ($request->hasFile('imageFile')) {
            if ($oldImagePath !== '0' && $oldImagePath !== null) {
                $request->user()->avatar = (new ImageService())->updateImage( $request, 'avatar', $oldImagePath);
            } else {
                $request->user()->avatar = (new ImageService())->uploadImage($request, 'avatar');
            }
        }

        $request->user()->save();

        return to_route('profile.edit');
    }
}
