<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DisasterPosts;
use App\Models\ProblemRepport;
use App\Models\Repport;
use App\Models\RepportComment;
use App\Models\RepportProof;
use App\Models\RepportSupport;
use App\Services\ConvertAlamatService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class RepportController extends Controller
{
    protected $convertAlamat;
    protected $laporan;
    protected $disasterPost;

    public function __construct(ConvertAlamatService $convertAlamat)
    {
        $this->convertAlamat = $convertAlamat;
        $this->laporan = Repport::with('repportProofs', 'problemRepport', 'repportSupports', 'repportComments', 'repportImpacts');
        $this->disasterPost = DisasterPosts::with('disasterPostsProgression', 'disasterPostsProof', 'disasterPostsRefugees');
    }

    public function getLaporan($id)
    {
        $laporan = $this->laporan->where('id', $id)->first();

        if (!$laporan) {
            return response()->json([
                'success' => false,
                'message' => 'Laporan tidak ditemukan'
            ], 404);
        }

        $is_laporan_sendiri = $laporan->user_id == auth()->user()->id;
        $buktiLaporan = $laporan->repportProofs->map(function ($bukti) {
            return [
                'bukti_laporan' => $bukti->file_path,
                'is_video' => $bukti->file_type == "video"
            ];
        });

        $comments = $laporan->repportComments->map(function ($comment) {

            $is_komentar_kapolsek = $comment->user_id == 1;

            return [
                'id' => $comment->id,
                'user_id' => $comment->user_id,
                'nama' => $comment->user->name,
                'foto_profil' => null,
                'comment' => $comment->comment,
                'tanggal_comment' => $comment->created_at->format('d M Y H:i:s'),
                'is_comment_dia_sendiri' => $comment->user_id == auth()->user()->id,
                'is_editted_comment' => $comment->updated_at != $comment->created_at,
                'kapolsek_bukti' => $comment->proofs->isEmpty() ? null : $comment->proofs->map(function ($bukti_kapolsek) {
                    return [
                        'bukti_kapolsek' => $bukti_kapolsek->file_path,
                    ];
                }),
                'is_komentar_kapolsek' => $is_komentar_kapolsek
            ];
        });

        $comments = $comments->sortByDesc('is_komentar_kapolsek')->values()->all();

        $jumlah_pendukung = $laporan->repportSupports->count();
        $is_memberi_dukungan = $laporan->repportSupports->where('user_id', auth()->user()->id)->first();

        if ($is_memberi_dukungan) {
            return response()->json([
                'success' => true,
                'message' => 'Data laporan Berhasil diambil',
                'data' => [
                    'id' => $laporan->id,
                    'judul_laporan' => $laporan->title,
                    'deskripsi_laporan' => $laporan->description,
                    'alamat_laporan' => $laporan->address ? $laporan->address : null,
                    'status_laporan' => $laporan->status,
                    'pendukung' => $jumlah_pendukung,
                    'is_laporan_sendiri' => $is_laporan_sendiri,
                    'is_memberi_dukungan' => true,
                    'bukti_laporan' => $buktiLaporan,
                    'comments' => $comments,
                ]
            ]);
        } else {
            return response()->json([
                'success' => true,
                'message' => 'Data laporan Berhasil diambil',
                'data' => [
                    'id' => $laporan->id,
                    'judul_laporan' => $laporan->title,
                    'deskripsi_laporan' => $laporan->description,
                    'alamat_laporan' => $laporan->address ? $laporan->address : null,
                    'status_laporan' => $laporan->status,
                    'pendukung' => $jumlah_pendukung,
                    'is_laporan_sendiri' => $is_laporan_sendiri,
                    'is_memberi_dukungan' => false,
                    'bukti_laporan' => $buktiLaporan,
                    'comments' => $comments,
                ]
            ]);
        }
    }

    public function laporanReport($id, Request $request)
    {
        $validator = Validator::make($request->all(), [
            'pesan_report' => 'required|string',
            'latitude' => 'required|string',
            'longitude' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        try {
            $initLog = auth()->user()->id;
            $laporan = $this->laporan->where('id', $id)->first();

            if (!$laporan) {
                return response()->json([
                    'success' => false,
                    'message' => 'Laporan tidak ditemukan'
                ], 404);
            }

            // Menghitung jarak antara lokasi user dan lokasi laporan
            $radius = 6371; // Radius bumi dalam kilometer

            $latFrom = deg2rad(floatval($laporan->latitude));
            $longFrom = deg2rad(floatval($laporan->longitude));
            $latTo = deg2rad(floatval($request->latitude));
            $longTo = deg2rad(floatval($request->longitude));

            $latDelta = $latTo - $latFrom;
            $longDelta = $longTo - $longFrom;

            $angle = 2 * asin(sqrt(pow(sin($latDelta / 2), 2) +
                cos($latFrom) * cos($latTo) * pow(sin($longDelta / 2), 2)));
            $distance = $radius * $angle;

            // Validasi jarak 5 kilometer
            if ($distance > 5) {
                return response()->json([
                    'success' => false,
                    'message' => 'Gagal melaporkan karena jarak terlalu jauh'
                ], 400);
            }

            $reportLaporan = ProblemRepport::where('repport_id', $id)->where('user_id', $initLog)->first();
            if ($reportLaporan) {
                return response()->json([
                    'success' => false,
                    'message' => 'Anda sudah melaporkan laporan ini'
                ], 400);
            }

            if ($laporan->user_id == $initLog) {
                return response()->json([
                    'success' => false,
                    'message' => 'Tidak bisa melaporkan laporan sendiri'
                ], 400);
            }

            $successInsert = ProblemRepport::create([
                'repport_id' => $id,
                'user_id' => $initLog,
                'reason' => $request->pesan_report,
            ]);

            if ($successInsert) {
                return response()->json([
                    'success' => true,
                    'message' => 'Berhasil melaporkan laporan'
                ]);
            }
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function beriDukungan($id, $lat, $long)
    {
        $initLog = auth()->user()->id;

        $laporan = $this->laporan->where('id', $id)->first();

        if (!$laporan) {
            return response()->json([
                'success' => false,
                'message' => 'Laporan tidak ditemukan'
            ], 404);
        }

        // Menghitung jarak antara lokasi user dan lokasi laporan
        $radius = 6371; // Radius bumi dalam kilometer

        $latFrom = deg2rad(floatval($laporan->latitude));
        $longFrom = deg2rad(floatval($laporan->longitude));
        $latTo = deg2rad(floatval($lat));
        $longTo = deg2rad(floatval($long));

        $latDelta = $latTo - $latFrom;
        $longDelta = $longTo - $longFrom;

        $angle = 2 * asin(sqrt(pow(sin($latDelta / 2), 2) +
            cos($latFrom) * cos($latTo) * pow(sin($longDelta / 2), 2)));
        $distance = $radius * $angle;


        // Validasi jarak 5 kilometer
        if ($distance > 5) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mendukung karena jarak terlalu jauh'
            ], 400);
        }

        $is_laporan_sendiri = $laporan->user_id == $initLog;

        if ($is_laporan_sendiri) {
            return response()->json([
                'success' => false,
                'message' => 'Tidak bisa memberi dukungan pada laporan sendiri'
            ], 400);
        }

        $is_memberi_dukungan = $laporan->repportSupports->where('user_id', $initLog)->first();

        if ($is_memberi_dukungan) {
            $initCountLaporan = RepportSupport::where('repport_id', $id)->count();

            $laporan->repportSupports()->where('user_id', $initLog)->delete();

            if ($initCountLaporan - 1 < 10) {
                $this->laporan->update([
                    'status' => 'need_support'
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Berhasil membatalkan dukungan'
            ]);
        }

        $successInsert = $laporan->repportSupports()->create([
            'user_id' => $initLog,
        ]);

        if ($successInsert) {
            $selectCountVoteLaporan = RepportSupport::where('repport_id', $id)->count();
            if ($selectCountVoteLaporan >= 10) {
                $laporan->update([
                    'status_laporan' => 'need_responsible'
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Berhasil memberi dukungan'
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Gagal memberi dukungan'
        ], 400);
    }

    public function commentLaporan($id)
    {
        $initLog = auth()->user()->id;

        $laporan = $this->laporan->where('id', $id)->first();

        $validator = Validator::make(request()->all(), [
            'comment_laporan' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        try {
            if (!$laporan) {
                return response()->json([
                    'success' => false,
                    'message' => 'Laporan tidak ditemukan'
                ], 404);
            }

            $successInsert = $laporan->repportComments()->create([
                'user_id' => $initLog,
                'comment' => request()->comment_laporan,
            ]);

            if ($successInsert) {
                return response()->json([
                    'success' => true,
                    'message' => 'Berhasil memberikan komentar pada laporan'
                ]);
            }
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }


    public function updateCommentLaporan($id)
    {
        $initLog = auth()->user()->id;

        $comment = RepportComment::where('id', $id)->first();

        if (!$comment) {
            return response()->json([
                'success' => false,
                'message' => 'Komentar tidak ditemukan'
            ], 404);
        }

        if ($comment->user_id != $initLog) {
            return response()->json([
                'success' => false,
                'message' => 'Anda tidak bisa mengubah komentar orang lain'
            ], 400);
        }

        $validator = Validator::make(request()->all(), [
            'comment_laporan' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        try {
            $successUpdate = $comment->update([
                'comment' => request()->comment_laporan,
            ]);

            if ($successUpdate) {
                return response()->json([
                    'success' => true,
                    'message' => 'Berhasil mengubah komentar'
                ]);
            }

            return response()->json([
                'success' => false,
                'message' => 'Gagal mengubah komentar'
            ], 400);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function deleteCommentLaporan($id)
    {
        $initLog = auth()->user()->id;

        $comment = RepportComment::where('id', $id)->first();

        if (!$comment) {
            return response()->json([
                'success' => false,
                'message' => 'Komentar tidak ditemukan'
            ], 404);
        }

        if ($comment->user_id != $initLog) {
            return response()->json([
                'success' => false,
                'message' => 'Anda tidak bisa menghapus komentar orang lain'
            ], 400);
        }

        $successDelete = $comment->delete();

        if ($successDelete) {
            return response()->json([
                'success' => true,
                'message' => 'Berhasil menghapus komentar'
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Gagal menghapus komentar'
        ], 400);
    }

    public function laporanUmum($latitude, $longitude, $status_laporan)
    {
        $lat = floatval($latitude);
        $long = floatval($longitude);

        $radius = 6371;

        if ($status_laporan == 'semua-data-terdekat') {
            $laporanTerdekatInit = Repport::selectRaw(
                "id,address, title, description, radius, latitude, longitude, status,
                ($radius * acos(cos(radians(?)) * cos(radians(`latitude`)) * cos(radians(`longitude`) - radians(?)) + sin(radians(?)) * sin(radians(`latitude`)))) AS distance",
                [$lat, $long, $lat]
            )
                ->having("distance", "<", 5)
                ->orderBy("distance", "asc")
                ->with(['repportProofs:id,repport_id,file_path'])
                ->get();
        } else {
            $laporanTerdekatInit = Repport::selectRaw(
                "id,address, title, description, radius, latitude, longitude, status,
                    ($radius * acos(cos(radians(?)) * cos(radians(`latitude`)) * cos(radians(`longitude`) - radians(?)) + sin(radians(?)) * sin(radians(`latitude`)))) AS distance",
                [$lat, $long, $lat]
            )
                ->having("distance", "<", 5)
                ->orderBy("distance", "asc")
                ->with(['repportProofs:id,repport_id,file_path'])
                ->where('status', $status_laporan)
                ->get();
        }

        if ($laporanTerdekatInit->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Tidak ada laporan terdekat'
            ], 404);
        }

        $mappedData = $laporanTerdekatInit->map(function ($item) {
            return [
                'id' => $item->id,
                'judul_laporan' => $item->title,
                'deskripsi_laporan' => $item->description,
                'alamat_laporan' => $item->address,
                'status_laporan' => $item->status,
                'bukti_laporan' => $item->repportProofs ? $item->repportProofs[0]->file_path : null,
                'pendukung' => $item->repportSupports ? $item->repportSupports->count() : 0,
            ];
        });

        return response()->json([
            'success' => true,
            'message' => 'Laporan terdekat berhasil diambil.',
            'data' => $mappedData
        ]);
    }

    public function laporanAnda($status_laporan)
    {
        $initLog = auth()->user()->id;

        if ($status_laporan == 'semua-data') {
            $laporanAnda = $this->laporan->where('user_id', $initLog)->get();
        } else {
            $laporanAnda = $this->laporan->where('user_id', $initLog)->where('status', $status_laporan)->get();
        }

        if ($laporanAnda->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Tidak ada laporan'
            ], 404);
        }

        $mappedData = $laporanAnda->map(function ($item) {
            return [
                'id' => $item->id,
                'judul_laporan' => $item->title,
                'deskripsi_laporan' => $item->description,
                'alamat_laporan' => $item->address ? $item->address : null,
                'status_laporan' => $item->status,
                'bukti_laporan' => $item->repportProofs ? $item->repportProofs[0]->file_path : null,
                'pendukung' => $item->repportSupports ? $item->repportSupports->count() : 0,
            ];
        });

        return response()->json([
            'success' => true,
            'message' => 'Laporan anda berhasil diambil.',
            'data' => $mappedData
        ]);
    }

    public function allLaporan()
    {
        $laporans = $this->laporan->get();
        $disasterPosts = $this->disasterPost->get();

        if ($laporans->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Tidak ada laporan'
            ], 404);
        }

        $mappedData = $laporans->map(function ($laporan) {

            $latitude = (float) str_replace(',', '.', $laporan->latitude);
            $longitude = (float) str_replace(',', '.', $laporan->longitude);

            $imagePath = asset('storage/' . $laporan->repportProofs[0]->file_path);

            return [
                'id' => $laporan->id,
                'lat' => $latitude,
                'long' => $longitude,
                'judul_laporan' => $laporan->title,
                'deskripsi_laporan' => $laporan->description,
                'image_laporan' => $imagePath,
                'status_laporan' => $laporan->status,
                'radius' => $laporan->radius,
                'alamat_laporan' => $laporan->address ? $laporan->address : null,
                'pendukung' => $laporan->repportSupports ? $laporan->repportSupports->count() : 0,
            ];
        });

        $mappedDisasterPosts = $disasterPosts->map(function ($disasterPost) {

            $latitude = (float) str_replace(',', '.', $disasterPost->latitude);
            $longitude = (float) str_replace(',', '.', $disasterPost->longitude);

            $imagePath = asset('storage/' . $disasterPost->disasterPostsProof[0]->file_path);

            return [
                'id' => $disasterPost->id,
                'lat' => $latitude,
                'long' => $longitude,
                'title' => $disasterPost->title,
                'description' => $disasterPost->description,
                'image' => $imagePath,
                'address' => $disasterPost->address ? $disasterPost->address : null,
            ];
        });

        return response()->json([
            'success' => true,
            'message' => 'Laporan semua di dunia berhasil diambil.',
            'data' => $mappedData,
            'data_disaster_posts' => $mappedDisasterPosts
        ]);
    }

    public function buatLaporan($latitude, $longitude, Request $request)
    {
        $initLog = auth()->user()->id;

        // Validasi input
        $validator = Validator::make($request->all(), [
            'judul_laporan' => 'required|string',
            'deskripsi_laporan' => 'required|string',
            'radius' => 'required|numeric',
            'bukti_laporan' => 'required|array',
            'bukti_laporan.*.bukti_laporan' => 'required|file',
            'alamat_laporan' => 'required|string',
            'lat' => 'required|numeric',
            'type' => 'required|string',
            'long' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        try {
            // Menghitung jarak antara dua koordinat
            $latFrom = deg2rad(floatval($latitude));
            $longFrom = deg2rad(floatval($longitude));
            $latTo = deg2rad(floatval($request->lat));
            $longTo = deg2rad(floatval($request->long));

            $earthRadius = 6371;

            $latDelta = $latTo - $latFrom;
            $longDelta = $longTo - $longFrom;

            $angle = 2 * asin(sqrt(pow(sin($latDelta / 2), 2) +
                cos($latFrom) * cos($latTo) * pow(sin($longDelta / 2), 2)));
            $distance = $earthRadius * $angle;

            // Validasi jarak 5 kilometer
            if ($distance > 5) {
                return response()->json([
                    'success' => false,
                    'message' => 'Jarak yang anda masukkan di laporan terlalu jauh dari lokasi anda'
                ], 400);
            }

            // Membuat laporan baru
            $laporan = Repport::create([
                'user_id' => $initLog,
                'title' => $request->judul_laporan,
                'description' => $request->deskripsi_laporan,
                'address' => $request->alamat_laporan,
                'latitude' => $request->lat,
                'longitude' => $request->long,
                'radius' => $request->radius,
                'type' => $request->type,
            ]);

            $destinationPath = 'disaster_images/';
            foreach ($request->bukti_laporan as $file) {
                $extension = $file->getClientOriginalExtension();
                $buktiLaporanName = Str::uuid() . '.' . $extension;

                $imagePath = $file->storeAs('disaster_images', $buktiLaporanName, 'public');

                RepportProof::create([
                    'repport_id' => $laporan->id,
                    'file_path' => $imagePath,
                    'file_type' => strpos($file->getMimeType(), 'video') !== false ? 'video' : 'image',
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Berhasil membuat laporan'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function convertAlamat($latitude, $longitude)
    {
        $latitude = floatval($latitude);
        $longitude = floatval($longitude);

        $alamat = $this->convertAlamat->getAddressFromCoordinates($latitude, $longitude);

        return response()->json([
            'success' => true,
            'message' => 'Berhasil konversi alamat.',
            'data' => $alamat
        ]);
    }
}
