<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\RepportCommentRequest;
use App\Models\DisasterPosts;
use App\Models\Repport;
use App\Models\RepportCommentProof;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

            return redirect()->back()->with([
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
}
