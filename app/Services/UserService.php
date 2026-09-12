<?php

namespace App\Services;

use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;



class UserService
{

    public function createUser(StoreUserRequest $request)
    {
        // Validate the request data
        $data = $request->validated();

        $user = new User;
        $user->name = $data['name'];
        $user->email = $data['email'];
        $user->first_name = $data['first_name'];
        $user->last_name = $data['last_name'];
        $user->phone = $data['phone'];
        $user->avatar = 0;
        $user->status = $data['status'] ?? 'active';
        $user->remember_token =  null;
        $user->role = $data['role'];
        $user->password = Hash::make($data['password']);
        $user->pass_updated_at = now();
        $user->created_at = now();
        $user->updated_at = now();
        $user->created_by = auth()->user()->id;
        $user->updated_by = auth()->user()->id;
        $user->save();

        return $user;
    }

    public function updateUser(UpdateUserRequest $request, User $user)
    {
        // Validate the request data
    
        $data = $request->validated();

        $user->name = $data['name'];
        $user->email = $data['email'];
        $user->first_name = $data['first_name'];
        $user->last_name = $data['last_name'];
        $user->phone = $data['phone'];
        $user->avatar = $data['avatar'] ?? 0;
        $user->status = $data['status'] ?? 'active';
        $user->remember_token =  null;
        $user->role = $data['role'];
        if ($data['password']) {
            $user->password = Hash::make($data['password']);
            $user->pass_updated_at = now();
        }
        $user->updated_at = now();
        $user->updated_by = auth()->user()->id;
        $user->save();

        return new UserResource($user);
    }
}
