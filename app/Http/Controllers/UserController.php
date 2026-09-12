<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Enums\UserRole;
use App\Services\UserService;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Services\ImageService;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $usersQuery = User::query();
        $users =  $usersQuery->paginate(15)->onEachSide(1);

        return inertia('user/index', [
            "users" => UserResource::collection($users),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
        return inertia('user/create', [
            "roles" => UserRole::cases(),
            "success" => session('success'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $user = (new UserService())->createUser($request);
        return redirect()->route('user.create')->with('success', $user->name . 'created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return inertia('user/edit', [
            "user" => new UserResource($user),
            "roles" => UserRole::cases(),
            "success" => session('success'),
            "error" => session('error'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {

        $user = (new UserService())->updateUser($request, $user);

        return redirect()->route('user.edit', $user->id)->with('success', $user->name . ' updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        // destory user avatar
        (new ImageService())->deleteImage($user, 'avatar');

            $user->avatar = 0;
            $user->save();

            return redirect()->route('user.edit', $user->id)->with('success', $user->name . ' avatar deleted successfully');
    }
}
