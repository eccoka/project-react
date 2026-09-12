<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StockSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $stocks = [
            [
                'stock_name' => 'Main Warehouse',
                'stock_code' => 'WH001',
                'address' => '123 Main St, Cityville',
                'phone' => '123-456-7890',
            ],
            [
                'stock_name' => 'Secondary Warehouse',
                'stock_code' => 'WH002',
                'address' => '456 Secondary St, Townsville',
                'phone' => '987-654-3210',
            ],
            [
                'stock_name' => 'Tertiary Warehouse',
                'stock_code' => 'WH003',
                'address' => '789 Tertiary St, Villagetown',
                'phone' => '555-555-5555',
            ],

        ];

        foreach ($stocks as $stock) {
            DB::table('stocks')->insert(array_merge($stock, [
                'status' => 'active',
                'created_by' => 1,
                'updated_by' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
