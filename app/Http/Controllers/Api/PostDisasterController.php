<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DisasterPosts;
use Illuminate\Http\Request;

class PostDisasterController extends Controller
{
    protected $postDisaster;

    public function __construct()
    {
        $this->postDisaster = DisasterPosts::with('disasterPostsProgression.proof', 'disasterPostsProgression.user', 'disasterPostsProof', 'disasterPostsRefugees');
    }

    public function show(Request $request)
    {
        $posts = $this->postDisaster->get();

        return response()->json([
            'status' => true,
            'message' => 'Data Berhasil Diambil',
            'data' => $posts
        ]);
    }

    public function showById($id)
    {
        $posts = $this->postDisaster->where('id', $id)->first();

        if (!$posts) {
            return response()->json([
                'status' => false,
                'message' => 'Data Tidak Ditemukan',
            ], 404);
        }

        return response()->json([
            'status' => true,
            'message' => 'Data Berhasil Diambil',
            'data' => $posts
        ]);
    }
}
