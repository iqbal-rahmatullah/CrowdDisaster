<?php

namespace Database\Seeders;

use App\Models\Repport;
use App\Modules\Enums\ReportStatus;
use App\Modules\Enums\RepportType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RepportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Repport::insert([
            [
                'user_id' => 1,
                'latitude' => '-7.272304257721142',
                'longitude' => '112.79405888006289',
                'address' => 'Jl. Dharmahusada Mas III Blok BB-01 No.10, RT.002/RW.12, Mulyorejo, Kec. Mulyorejo, Surabaya, Jawa Timur 60115',
                'title' => 'Banjir Besar di Jl Dharmahusada',
                'description' => 'Hujan deras menyebabkan banjir di beberapa wilayah Mulyorejo.',
                'type' => RepportType::FLOOD,
                'status' => ReportStatus::NEED_SUPPORT,
                'radius' => 5.5,
                'additional_information' => json_encode(['ketinggian_air' => '1.5m']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 2,
                'latitude' => '-7.271578656749376',
                'longitude' => '112.79844688064267',
                'address' => 'Kalisari, Kec. Mulyorejo, Surabaya, Jawa Timur 60112',
                'title' => 'Gempa Bumi di Surabaya',
                'description' => 'Gempa bumi berkekuatan 6.5 SR mengguncang Surabaya.',
                'type' => RepportType::EARHTQUAKE,
                'status' => ReportStatus::NEED_SUPPORT,
                'radius' => 10.0,
                'additional_information' => json_encode(['skala_richter' => '6.5']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 3,
                'latitude' => '-7.274473420407902',
                'longitude' => '112.80157970076243',
                'address' => 'Jl. Kejawan Putih Tambak II No.11, RT.001/RW.01, Kejawaan Putih Tamba, Kec. Mulyorejo, Surabaya, Jawa Timur 60112',
                'title' => 'Gunung Meletus Surabaya',
                'description' => 'Gunung  mengalami erupsi dengan tinggi asap mencapai 4 km.',
                'type' => RepportType::VOLCANO,
                'status' => ReportStatus::NEED_SUPPORT,
                'radius' => 15.0,
                'additional_information' => json_encode(['status_vulkanik' => 'Awas']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
