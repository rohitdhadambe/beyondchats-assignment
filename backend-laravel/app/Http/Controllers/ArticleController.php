<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index()
    {
        // ✅ Show demo data only if DB is empty
        if (Article::count() === 0) {
            return response()->json([
                [
                    'id' => 1,
                    'title' => ' BeyondChats Overview',
                    'content' => ' Articles are populated via the scraper and AI pipeline.',
                    'is_updated' => false,
                ],
                [
                    'id' => 2,
                    'title' => ' AI Content Pipeline',
                    'content' => 'This demo shows how AI-enhanced content will appear once the pipeline runs.',
                    'is_updated' => true,
                ],
                [
                    'id' => 3,
                    'title' => ' Scraping Architecture',
                    'content' => 'This entry represents content fetched and processed from external sources.',
                    'is_updated' => false,
                ],
                [
                    'id' => 4,
                    'title' => ' Production Ready System',
                    'content' => 'Production data starts empty by design. This demo ensures UI clarity.',
                    'is_updated' => true,
                ]
            ]);
        }

        return Article::latest()->get();
    }

    public function store(Request $request)
    {
        return Article::create($request->all());
    }

    public function show($id)
    {
        return Article::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $article = Article::findOrFail($id);
        $article->update($request->all());
        return $article;
    }

    public function destroy($id)
    {
        Article::destroy($id);
        return response()->json(['message' => 'Deleted']);
    }
}
