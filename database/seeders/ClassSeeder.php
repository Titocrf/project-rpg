<?php

namespace Database\Seeders;

use App\Models\ClassModel;
use Illuminate\Database\Seeder;

class ClassSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ClassModel::create(['name' => 'Guerreiro']);
        ClassModel::create(['name' => 'Mago']);
        ClassModel::create(['name' => 'Arqueiro']);
        ClassModel::create(['name' => 'Clérigo']);
    }
}
