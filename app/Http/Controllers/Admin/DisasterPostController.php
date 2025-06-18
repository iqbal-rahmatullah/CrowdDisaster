<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\DisasterPostRequest;
use App\Models\DisasterPosts;
use App\Models\DisasterPostsProof;
use App\Models\Repport;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class DisasterPostController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard/post-disaster/index', [
            'allDisasterPost' => DisasterPosts::with([
                'disasterPostsProof',
            ])->paginate(8),
        ]);
    }

    public function show(DisasterPosts $disasterPost)
    {
        return Inertia::render('dashboard/post-disaster/detail-post', [
            'disasterPost' => $disasterPost->load([
                'disasterPostsProof',
                'disasterPostsRefugees',
                'disasterPostsProgression.proof',
                'disasterPostsProgression.user'
            ]),
        ]);
    }

    public function store(DisasterPostRequest $request)
    {
        try {
            $validated = $request->validated();

            if (isset($validated['image'])) {
                $extension = $validated['image']->getClientOriginalExtension();
                $filename = Str::uuid() . '.' . $extension;
                $imagePath = $validated['image']->storeAs('disaster_images', $filename, 'public');
                $validated['image_path'] = $imagePath;
            }

            $disasterPost = DisasterPosts::create($validated);

            DisasterPostsProof::create([
                'disaster_post_id' => $disasterPost->id,
                'file_path' => $validated['image_path'],
                'file_type' => "image",
            ]);

            return redirect()->route('repports.map')->with('success', 'Posko Bencana berhasil ditambahkan!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal menambahkan posko bencana. Silakan coba lagi.');
        }
    }

    public function delete(DisasterPosts $disasterPost)
    {
        try {
            $disasterPost->delete();
            return redirect()->route('disaster-posts.index')->with('success', 'Posko Bencana berhasil dihapus!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal menghapus posko bencana. Silakan coba lagi.');
        }
    }
}
