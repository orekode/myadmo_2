<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

        $regions = [
            ['name' => 'Greater Accra', 'lat' => 5.614818, 'lng' => -0.205874],
            ['name' => 'Ashanti', 'lat' => 6.693535, 'lng' => -1.624431],
            ['name' => 'Western', 'lat' => 5.309660, 'lng' => -2.326931],
            ['name' => 'Central', 'lat' => 5.360356, 'lng' => -0.629061],
            ['name' => 'Eastern', 'lat' => 6.091676, 'lng' => -0.036258],
            ['name' => 'Northern', 'lat' => 9.400792, 'lng' => -0.839310],
            ['name' => 'Upper East', 'lat' => 10.785353, 'lng' => -0.893967],
            ['name' => 'Upper West', 'lat' => 10.309837, 'lng' => -2.326755],
            ['name' => 'Volta', 'lat' => 7.151103, 'lng' => 0.363462],
            ['name' => 'Bono', 'lat' => 7.811240, 'lng' => -2.320112],
            ['name' => 'Bono East', 'lat' => 7.665801, 'lng' => -1.679891],
            ['name' => 'Ahafo', 'lat' => 6.987879, 'lng' => -2.571989],
            ['name' => 'Oti', 'lat' => 8.180042, 'lng' => 0.257108],
            ['name' => 'Western North', 'lat' => 6.418269, 'lng' => -2.321721],
            ['name' => 'Savannah', 'lat' => 8.570524, 'lng' => -1.983318],
            ['name' => 'North East', 'lat' => 10.528703, 'lng' => -0.780932]
        ];

        DB::table('locations')->insert($regions);
    }
}
