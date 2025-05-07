<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\DisasterPostProgressionRequest;
use App\Models\DisasterPosts;
use App\Models\DisasterPostsProgressionProof;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class DisasterProgressionController extends Controller
{
    public function store(DisasterPostProgressionRequest $request, DisasterPosts $disasterPost)
    {
        try {
            $validated = $request->validated();

            $createdProgression = $disasterPost->disasterPostsProgression()->create([
                'user_id' => Auth::user()->id,
                'progression' => $validated['progression'],
            ]);

            if (isset($validated['proof'])) {
                foreach ($validated['proof'] as $file) {
                    $extension = $file->getClientOriginalExtension();
                    $filename = Str::uuid() . '.' . $extension;
                    $imagePath = $file->storeAs('progression_proof', $filename, 'public');

                    DisasterPostsProgressionProof::create([
                        'disaster_posts_progressions_id' => $createdProgression->id,
                        'file_path' => $imagePath,
                        'file_type' => "image",
                    ]);
                }
            }

            return redirect()->back()->with('success', 'Progression berhasil ditambahkan!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal menambahkan progression. Silakan coba lagi.');
        }
    }
}
