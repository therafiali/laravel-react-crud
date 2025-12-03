<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;



class ImageUploadController extends Controller
{
    /**
     * Upload an image for a specific page and language
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */


    public function uploadImage(Request $request)
    {
        $request->validate(
            [
                "image" => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
                "page_key" => 'required|string',
                "lang" => 'required|in:en,ar',
                "field_name" => 'required|string'
            ]
        );


        if (!Page::where('page_key', $request->page_key) -> exists()) {
            return response() -> json(['error' => 'Page not found']);
        }

        try {
            
            $image = $request->file('image');

            $filename = $this->generateUniqueFilename(
                $request->page_key,
                $request->lang,
                $request->field_name,
                $image->getClientOriginalExtension()
            );

            $path = $image->storeAs(
                "pages/{$request->page_key}/{$request->lang}",
                $filename,
                'public'
            );

            $url = Storage::url($path);


            return response()->json([
                'success' => true,
                'url' => "http://localhost:8000/storage/{$path}",
                'path' => $path,
                'message' => 'Image uploaded successfully'
            ]);
            


        } catch (\Exception $e) {
           

            return response() -> json([
                'error' => 'Failed to upload image',
                'message' => $e->getMessage()
            ],500);
        }


    }

    public function deleteImage(Request $request) {
        

        $request -> validate([
            'path' => 'required|string'
        ]);

        try {
            
            if (Storage::disk('public') -> exists($request -> path)){
                Storage::disk('public') -> delete($request -> path);

                return response() -> json([

                    'success' => true,
                    'message' => 'Image deleted successfully'

                ], 200);

            }

            return response() -> json([
                'error' => 'Image not found'
            ],404);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to delete image',
                'message' => $e->getMessage()
            ], 500);
        }


    }

    public function generateUniqueFilename($pageKey, $lang, $fieldName, $extension) 
    {

        $timestamp = now() -> timestamp;
        $random = Str::random(8);

        $cleanFieldName = Str::slug($fieldName);

        return "{$cleanFieldName}_{$timestamp}_{$random}.{$extension}";

    }
}
