<?php

namespace App\Http\Controllers\Firmware;

use App\Http\Controllers\Controller;
use App\Models\Firmware;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class FirmwaresController extends Controller
{
    public function index()
    {
        return Inertia::render('firmwares/Index', [
            'firmwares' => Firmware::latest()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'version' => 'required|unique:firmware,version',
            'file' => 'required|file',
        ]);

        $file = $request->file('file');
        if (strtolower($file->getClientOriginalExtension()) !== 'bin') {
            return back()->withErrors([
                'file' => 'Only .bin firmware files are allowed.',
            ]);
        }

        $filename = time() . '_' . $file->getClientOriginalName();

        $file->storeAs(
            'firmwares',
            $filename,
            'public'
        );

        Firmware::create([
            'version' => $request->version,
            'filename' => $filename,
            'file_path' => 'firmwares/' . $filename,
            'active' => false,
        ]);

        return back()->with(
            'success',
            'Firmware uploaded.'
        );
    }

    public function activate(Firmware $firmware)
    {
        Firmware::query()->update([
            'active' => false
        ]);

        $firmware->update([
            'active' => true
        ]);

        return back()->with(
            'success',
            'Firmware activated.'
        );
    }


    public function destroy(Firmware $firmware)
    {
        // if ($firmware->active) {
        //     return back()->with('error', 'Active firmware cannot be deleted.');
        // }

        if (Storage::disk('public')->exists($firmware->file_path)) {
            Storage::disk('public')->delete($firmware->file_path);
        }

        $firmware->delete();

        return back()->with('success', 'Firmware deleted successfully.');
    }
}
