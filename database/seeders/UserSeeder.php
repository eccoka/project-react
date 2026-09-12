<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'admin',
                'first_name' => 'Admin',
                'last_name' => 'Login',
                'email' => 'admin@gmail.com',
                'phone' => '+36 70 111 1111',
                'role' => 'admin',
                'status' => 'active',
                'password' => Hash::make('Alma1234'),
                'created_at' => now(),
                'updated_at' => now(),
                'pass_updated_at' => now(),
            ],
            [
                'name' => 'leader',
                'first_name' => 'Leader',
                'last_name' => 'Login',
                'email' => 'leader@gmail.com',
                'phone' => '+36 70 111 2222',
                'role' => 'leader',
                'status' => 'active',
                'password' => Hash::make('Alma1234'),
                'created_at' => now(),
                'updated_at' => now(),
                'pass_updated_at' => now(),
            ],
            [
                'name' => 'manager',
                'first_name' => 'Manager',
                'last_name' => 'Login',
                'email' => 'manager@gmail.com',
                'phone' => '+36 70 111 3333',
                'role' => 'manager',
                'status' => 'active',
                'password' => Hash::make('Alma1234'),
                'created_at' => now(),
                'updated_at' => now(),
                'pass_updated_at' => now(),
            ],
            [
                'name' => 'employee',
                'first_name' => 'Employee',
                'last_name' => 'Login',
                'email' => 'employee@gmail.com',
                'phone' => '+36 70 111 4444',
                'role' => 'employee',
                'status' => 'active',
                'password' => Hash::make('Alma1234'),
                'created_at' => now(),
                'updated_at' => now(),
                'pass_updated_at' => now(),
            ]
        ]);
    }
}
