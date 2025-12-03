<?php

namespace App\Http\Controllers;

use App\Models\Page;

class PageController extends Controller
{
    public function getAllPages()
    {


        $pages = Page::all();

        return response()->json([
            'data' => $pages
        ]);
    }
}
