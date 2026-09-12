<?php

namespace Database\Seeders;

use App\Models\Survey;
use App\Models\User;



// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call(UserSeeder::class);

        $this->call(ItemgroupSeeder::class);

        $this->call(BrandSeeder::class);

        $this->call(ItemSeeder::class);

        $this->call(StockSeeder::class);

        $this->call(ItemparamSeeder::class);

/*         Survey::factory()
            ->count(10)
            ->hasQuestions(10)
            ->create(); */


//        User::factory()->create([
//            'name' => 'Test User',
//            'email' => 'test@example.com',
//        ]);
    }
}
