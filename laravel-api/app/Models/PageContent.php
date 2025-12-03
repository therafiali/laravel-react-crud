<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PageContent extends Model
{
    use HasFactory;

    protected $table = 'page_content';

    protected $fillable = ['page_key', 'lang', 'data'];


    protected $casts = ['data' => 'array'];
}
