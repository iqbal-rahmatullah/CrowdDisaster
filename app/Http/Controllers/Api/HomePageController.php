<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Repport;
use App\Services\ConvertAlamatService;
use Illuminate\Http\Request;

class HomePageController extends Controller
{
    protected $convertAlamat;

    public function __construct(ConvertAlamatService $convertAlamat)
    {
        $this->convertAlamat = $convertAlamat;
    }

    public function name()
    {
        return response()->json([
            'success' => true,
            'message' => 'Nama user berhasil diambil',
            'data' => [
                'id' => auth()->user()->id,
                'name' => auth()->user()->name
            ]
        ]);
    }

    public function detailUser()
    {
        return response()->json([
            'success' => true,
            'message' => 'Detail user berhasil diambil',
            'data' => auth()->user()
        ]);
    }

    public function laporanTerdekat($late, $longe)
    {
        $lat = floatval($late);
        $long = floatval($longe);
        $radius = 6371;

        $laporanTerdekatInit = Repport::selectRaw(
            "id,address, title, description, radius, latitude, longitude, status,
            ($radius * acos(cos(radians(?)) * cos(radians(`latitude`)) * cos(radians(`longitude`) - radians(?)) + sin(radians(?)) * sin(radians(`latitude`)))) AS distance",
            [$lat, $long, $lat]
        )
            ->where('status', 'need_support')
            ->having("distance", "<", 5)
            ->orderBy("distance", "asc")
            ->limit(4)
            ->with(['repportProofs:id,repport_id,file_path'])
            ->get();

        $mappedData = $laporanTerdekatInit->map(function ($item) {
            return [
                'id' => $item->id,
                'judul_laporan' => $item->title,
                'deskripsi_laporan' => $item->description,
                'alamat_laporan' => $item->address,
                'status_laporan' => $item->status,
                'bukti_laporan' => $item->repportProofs->isNotEmpty() ? $item->repportProofs->first()->file_path : null,
                'pendukung' => $item->repportSupports ? $item->repportSupports->count() : 0,
            ];
        });

        return response()->json([
            'success' => true,
            'message' => 'Laporan terdekat berhasil diambil',
            'data' => $mappedData
        ]);
    }
}
