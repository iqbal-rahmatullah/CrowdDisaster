<?php

namespace Database\Seeders;

use App\Models\Repport;
use App\Models\RepportProof;
use App\Modules\Enums\ProofFileType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RepportProofSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $repportIds = Repport::pluck('id');
        $counter = 1;

        foreach ($repportIds as $repportId) {
            RepportProof::insert([
                'repport_id' => $repportId,
                'file_path' => 'img/dummy/' . $counter . '.jpg',
                'file_type' => ProofFileType::IMAGE,
            ]);

            $counter++;
        }
    }
}
