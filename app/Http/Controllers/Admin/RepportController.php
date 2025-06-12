<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\RepportCommentRequest;
use App\Http\Requests\RepportImpactRequest;
use App\Models\DisasterPosts;
use App\Models\Repport;
use App\Models\RepportCommentProof;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Str;

class RepportController extends Controller
{
    public function indexRepportMap()
    {
        return Inertia::render('dashboard/repport/repport-map', [
            'allRepports' => Repport::with('repportProofs')->get(),
            'allDisasterPost' => DisasterPosts::with([
                'disasterPostsProof',
                'disasterPostsRefugees'
            ])->get(),
        ]);
    }

    public function index()
    {
        return Inertia::render('dashboard/repport/index', [
            'allRepports' => Repport::with([
                'repportProofs',
                'repportComments',
                'repportImpacts',
                'user',
            ])->get(),
        ]);
    }

    public function showRepport(Repport $repport)
    {
        return Inertia::render('dashboard/repport/detail-repport', [
            'repport' => $repport->load([
                'repportProofs',
                'repportComments.user',
                'repportComments.proofs',
                'repportImpacts',
                'repportSupports.user',
            ]),
        ]);
    }

    public function editStatusRepport(Request $request, Repport $repport)
    {
        try {
            $repport->update([
                'status' => $request->input('status'),
            ]);

            return redirect()->back()->with([
                'success' => 'Status Laporan Berhasil Diubah',
            ]);
        } catch (\Exception $e) {
            return redirect()->back()->with([
                'error' => 'Status Laporan Gagal Diubah',
            ]);
        }
    }

    public function delete(Repport $repport)
    {
        try {
            $repport->delete();

            return redirect()->route('repports.index')->with([
                'success' => 'Laporan Berhasil Dihapus',
            ]);
        } catch (\Exception $e) {
            return redirect()->back()->with([
                'error' => 'Laporan Gagal Dihapus',
            ]);
        }
    }

    public function addComment(RepportCommentRequest $request, Repport $repport)
    {
        try {
            $validate = $request->validated();

            $commentCreated = $repport->repportComments()->create([
                'user_id' => Auth::user()->id,
                'comment' => $validate['comment'],
            ]);

            if (isset($validate['proof'])) {
                foreach ($validate['proof'] as $file) {
                    $extension = $file->getClientOriginalExtension();
                    $filename = Str::uuid() . '.' . $extension;
                    $imagePath = $file->storeAs('comment_proof', $filename, 'public');

                    RepportCommentProof::create([
                        'repport_comment_id' => $commentCreated->id,
                        'file_path' => $imagePath,
                        'file_type' => 'image',
                    ]);
                }
            }


            return redirect()->back()->with([
                'success' => 'Komentar Berhasil Ditambahkan',
            ]);
        } catch (\Exception $e) {
            return redirect()->back()->with([
                'error' => 'Komentar Gagal Ditambahkan',
            ]);
        }
    }

    public function addImpact(RepportImpactRequest $request, Repport $repport)
    {
        try {
            $validated = $request->validated();

            $repport->repportImpacts()->updateOrCreate(
                ['repport_id' => $repport->id],
                [
                    'victim_died' => $validated['victim_died'],
                    'victim_injured' => $validated['victim_injured'],
                    'damaged_house' => $validated['damaged_house'],
                    'damaged_building' => $validated['damaged_building'],
                    'damaged_village' => $validated['damaged_village'],
                ]
            );

            return redirect()->back()->with('success', 'Dampak bencana berhasil ditambahkan.');
        } catch (\Exception $e) {
            Log::debug('Error adding disaster impact: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Gagal menambahkan dampak bencana. Silakan coba lagi.');
        }
    }
}
