<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use GuzzleHttp\Client;
use Symfony\Component\DomCrawler\Crawler;
use App\Models\Article;

class ScrapeBeyondChatsBlogs extends Command
{
    protected $signature = 'scrape:beyondchats';
    protected $description = 'Scrape 5 oldest blogs from BeyondChats';

    public function handle()
    {
        $client = new Client([
    'verify' => false
]);

        $response = $client->get('https://beyondchats.com/blogs/');
        $html = (string) $response->getBody();

        $crawler = new Crawler($html);

        // Collect blog links
        $links = $crawler->filter('a')->each(function ($node) {
            $href = $node->attr('href');

            if (!$href || !str_contains($href, '/blogs/')) {
                return null;
            }

            // Convert relative URL to absolute
            if (str_starts_with($href, '/')) {
                $href = 'https://beyondchats.com' . $href;
            }

            return $href;
        });


        $links = array_values(array_unique(array_filter($links)));

        // Take last 5 (oldest)
        $oldestLinks = array_slice($links, -5);

        foreach ($oldestLinks as $url) {

            // Avoid duplicates
            if (Article::where('source_url', $url)->exists()) {
                continue;
            }

            $articleHtml = $client->get($url)->getBody()->getContents();
            $articleCrawler = new Crawler($articleHtml);

            $title = $articleCrawler->filter('h1')->text('');
            $content = $articleCrawler->filter('article')->text('');

            Article::create([
                'title' => $title,
                'content' => $content,
                'source_url' => $url,
                'is_updated' => false,
            ]);

            $this->info("Saved: $title");
        }

        $this->info('✅ Scraping completed successfully');
    }
}
