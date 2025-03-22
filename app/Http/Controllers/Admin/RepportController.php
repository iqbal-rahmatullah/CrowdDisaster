<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Repport;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RepportController extends Controller
{
    public function indexRepportMap()
    {
        return Inertia::render('dashboard/repport-map', [
            'allRepports' => Repport::with('repportProofs')->get(),
        ]);
    }
}
