<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\DisasterPostRefugeeRequest;
use App\Models\DisasterPostsRefugees;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DisasterPostRefugeeController extends Controller
{
    public function store(DisasterPostRefugeeRequest $request, $disasterPostId)
    {
        try {
            $validated = $request->validated();

            $validated['disaster_post_id'] = $disasterPostId;

            DisasterPostsRefugees::create($validated);

            return redirect()->back()->with('success', 'Data pengungsi berhasil ditambahkan!');
        } catch (\Exception $e) {
            Log::error('Gagal menambahkan data pengungsi', ['error' => $e->getMessage()]);

            return redirect()->back()->with('error', 'Gagal menambahkan data pengungsi. Silakan coba lagi.');
        }
    }


    public function destroy($disasterPostId, $id)
    {
        try {
            $refugee = DisasterPostsRefugees::findOrFail($id);
            $refugee->delete();

            return redirect()->back()->with('success', 'Data pengungsi berhasil dihapus!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal menghapus data pengungsi. Silakan coba lagi.');
        }
    }

    public function edit(DisasterPostRefugeeRequest $request, $disasterPostId, $id)
    {
        try {
            $refugee = DisasterPostsRefugees::findOrFail($id);

            $validated = $request->validated();
            $validated['disaster_post_id'] = $disasterPostId;
            $refugee->update($validated);

            return redirect()->back()->with('success', 'Data pengungsi berhasil diubah!');
        } catch (\Exception $e) {
            Log::error('Gagal mendapatkan data pengungsi', ['error' => $e->getMessage()]);

            return redirect()->back()->with('error', 'Gagal mengubah data pengungsi. Silakan coba lagi.');
        }
    }
}
