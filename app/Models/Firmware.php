<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Firmware extends Model
{
    protected $fillable = [
        'version',
        'filename',
        'file_path',
        'file_size',
        'release_notes',
        'active',
    ];
}
