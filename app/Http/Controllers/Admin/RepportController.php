<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DisasterPosts;
use App\Models\Repport;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
                'repportComments',
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
}
