<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Repport;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render(
            'dashboard',
            [
                'repportCount' => Repport::count(),
                'userCount' => User::count(),
                'allRepports' => Repport::all(),
            ]
        );
    }
}
