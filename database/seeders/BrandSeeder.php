<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $brands = [
            ['name' => 'Apple', 'motto' => 'Think Different', 'website' => 'https://www.apple.com', 'description' => 'Innovative technology company', 'status' => 'active', 'logo' => null],
            ['name' => 'Samsung', 'motto' => 'Imagine the Possibilities', 'website' => 'https://www.samsung.com', 'description' => 'Leading electronics manufacturer', 'status' => 'active', 'logo' => null],
            ['name' => 'Sony', 'motto' => 'Be Moved', 'website' => 'https://www.sony.com', 'description' => 'Global leader in electronics and entertainment', 'status' => 'active', 'logo' => null],
            ['name' => 'LG', 'motto' => 'Life’s Good', 'website' => 'https://www.lg.com', 'description' => 'Innovative home appliances and electronics', 'status' => 'active', 'logo' => null],
            ['name' => 'Asus', 'motto' => 'In Search of Incredible', 'website' => 'https://www.asus.com', 'description' => 'High-performance computing solutions', 'status' => 'active', 'logo' => null],
            ['name' => 'MSI', 'motto' => 'True Gaming', 'website' => 'https://www.msi.com', 'description' => 'Gaming and professional hardware', 'status' => 'active', 'logo' => null],
            ['name' => 'Dell', 'motto' => 'Yours is Here', 'website' => 'https://www.dell.com', 'description' => 'Reliable computing solutions', 'status' => 'active', 'logo' => null],
            ['name' => 'HP', 'motto' => 'Keep Reinventing', 'website' => 'https://www.hp.com', 'description' => 'Innovative computing and printing solutions', 'status' => 'active', 'logo' => null],
            ['name' => 'Lenovo', 'motto' => 'Smarter Technology for All', 'website' => 'https://www.lenovo.com', 'description' => 'Smart technology for all', 'status' => 'active', 'logo' => null],
            ['name' => 'Acer', 'motto' => 'Explore Beyond Limits', 'website' => 'https://www.acer.com', 'description' => 'Affordable and reliable computing', 'status' => 'active', 'logo' => null],
            ['name' => 'Gigabyte', 'motto' => 'Upgrade Your Life', 'website' => 'https://www.gigabyte.com', 'description' => 'High-quality motherboards and GPUs', 'status' => 'active', 'logo' => null],
            ['name' => 'Intel', 'motto' => 'Experience What’s Inside', 'website' => 'https://www.intel.com', 'description' => 'World leader in semiconductor innovation', 'status' => 'active', 'logo' => null],
            ['name' => 'AMD', 'motto' => 'High Performance Computing', 'website' => 'https://www.amd.com', 'description' => 'High-performance computing and graphics', 'status' => 'active', 'logo' => null],
            ['name' => 'NVIDIA', 'motto' => 'The Way It’s Meant to Be Played', 'website' => 'https://www.nvidia.com', 'description' => 'Pioneering graphics and AI technology', 'status' => 'active', 'logo' => null],
            ['name' => 'Corsair', 'motto' => 'Performance Gaming Gear', 'website' => 'https://www.corsair.com', 'description' => 'High-performance gaming peripherals', 'status' => 'active', 'logo' => null],
            ['name' => 'Razer', 'motto' => 'For Gamers. By Gamers.', 'website' => 'https://www.razer.com', 'description' => 'Gaming hardware and accessories', 'status' => 'active', 'logo' => null],
            ['name' => 'Logitech', 'motto' => 'Defy Logic', 'website' => 'https://www.logitech.com', 'description' => 'Innovative peripherals and accessories', 'status' => 'active', 'logo' => null],
            ['name' => 'Philips', 'motto' => 'Innovation and You', 'website' => 'https://www.philips.com', 'description' => 'Health and consumer electronics', 'status' => 'active', 'logo' => null],
            ['name' => 'Panasonic', 'motto' => 'A Better Life, A Better World', 'website' => 'https://www.panasonic.com', 'description' => 'Electronics and home appliances', 'status' => 'active', 'logo' => null],
            ['name' => 'Huawei', 'motto' => 'Building a Fully Connected World', 'website' => 'https://www.huawei.com', 'description' => 'Global leader in telecommunications', 'status' => 'active', 'logo' => null],
            ['name' => 'Toshiba', 'motto' => 'Leading Innovation', 'website' => 'https://www.toshiba.com', 'description' => 'Electronics and storage solutions', 'status' => 'active', 'logo' => null],
            ['name' => 'Seagate', 'motto' => 'Data Storage Solutions', 'website' => 'https://www.seagate.com', 'description' => 'Reliable storage devices', 'status' => 'active', 'logo' => null],
            ['name' => 'Western Digital', 'motto' => 'Creating Storage Solutions', 'website' => 'https://www.westerndigital.com', 'description' => 'Innovative storage solutions', 'status' => 'active', 'logo' => null],
            ['name' => 'Kingston', 'motto' => 'Memory and Storage Solutions', 'website' => 'https://www.kingston.com', 'description' => 'High-quality memory products', 'status' => 'active', 'logo' => null],
            ['name' => 'Sandisk', 'motto' => 'Expand Your World', 'website' => 'https://www.sandisk.com', 'description' => 'Portable storage solutions', 'status' => 'active', 'logo' => null],
            ['name' => 'Pioneer', 'motto' => 'Sound. Vision. Soul.', 'website' => 'https://www.pioneer.com', 'description' => 'Audio and video equipment', 'status' => 'active', 'logo' => null],
            ['name' => 'Sharp', 'motto' => 'Be Original', 'website' => 'https://www.sharp.com', 'description' => 'Electronics and appliances', 'status' => 'active', 'logo' => null],
            ['name' => 'Epson', 'motto' => 'Exceed Your Vision', 'website' => 'https://www.epson.com', 'description' => 'Printing and imaging solutions', 'status' => 'active', 'logo' => null],
            ['name' => 'Canon', 'motto' => 'Delighting You Always', 'website' => 'https://www.canon.com', 'description' => 'Imaging and optical products', 'status' => 'active', 'logo' => null],
        ];

        foreach ($brands as $brand) {
            DB::table('brands')->insert(array_merge($brand, [
                'created_by' => 1, // Assuming user ID 1 is the admin
                'updated_by' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}