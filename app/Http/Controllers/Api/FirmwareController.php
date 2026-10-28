<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Firmware;
use Illuminate\Http\Request;

class FirmwareController extends Controller
{
    public function latest()
    {
        $firmware = Firmware::where('active', true)->first();

        if (!$firmware) {
            return response()->json([
                'success' => false,
                'message' => 'No active firmware.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'version' => $firmware->version,
            'filename' => $firmware->filename,
            'url' => asset('storage/' . $firmware->file_path),
        ]);
    }
}
