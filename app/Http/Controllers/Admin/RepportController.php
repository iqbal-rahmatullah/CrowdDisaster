<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Repport;
use Inertia\Inertia;

class RepportController extends Controller
{
    public function indexRepportMap()
    {
        return Inertia::render('dashboard/repport/repport-map', [
            'allRepports' => Repport::with('repportProofs')->get(),
        ]);
    }

    public function showRepport(Repport $repport)
    {
        return Inertia::render('dashboard/repport/detail-repport', [
            'repport' => $repport->load([
                'repportProofs',
                'repportComments',
                'repportImpacts',
                'repportSupports',
            ]),
        ]);
    }
}
