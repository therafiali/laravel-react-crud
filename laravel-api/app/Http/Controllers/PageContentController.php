<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\PageContent;
use Illuminate\Http\Request;

class PageContentController extends Controller
{
    public function store(Request $request, $page_key)
    {


        $request->validate([
            'lang' => 'required|in:en,ar',
            'data' => 'required|array',
            'data.main_image' => 'nullable|string',
            'data.gallery_images' => 'nullable|array',
        ]);

        if (!Page::where('page_key', $page_key)->exists()) {
            return response()->json(['error' => 'Page not found'], 404);
        }

        $content = PageContent::updateOrCreate(
            [
                'page_key' => $page_key,
                'lang' => $request->lang
            ],
            [
                'data' => $request->data
            ]
        );

        return response()->json([
            "message" => 'Content Saved Successfully',
            'result' => $content
        ]);
    }

    public function show(Request $request, $page_key)
    {

        $lang =  $request->query('lang', 'en');

        $content = PageContent::where('page_key', $page_key)->where('lang', $lang)->first();

        if (!$content) {
            return response()->json(['data' => []]);
        }

        return response()->json($content);
    }
}
