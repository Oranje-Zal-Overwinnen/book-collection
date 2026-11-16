<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookRequest;
use App\Http\Resources\BookResource;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BookController extends Controller
{
    public function index()
    {
        return BookResource::collection(Book::withCount('reviews')->get());
    }

    public function store(StoreBookRequest $request)
    {
        Book::create($request->validated());

        return $this->allBooks();
    }

    public function update(StoreBookRequest $request, Book $book)
    {
        $book->update($request->validated());

        return $this->allBooks();
    }

    public function destroy(Request $request, Book $book)
    {
        if ($book->reviews()->exists() && ! $request->boolean('with_reviews')) {
            return response()->json([
                'message' => 'Kan het boek niet verwijderen omdat er nog gekoppelde reviews bestaan. Kies ervoor om het boek samen met de reviews te verwijderen.',
                'reviews_count' => $book->reviews()->count(),
            ], 422);
        }

        DB::transaction(function () use ($book) {
            $book->reviews()->delete();
            $book->delete();
        });

        return response()->json([
            'message' => 'Boek succesvol verwijderd',
        ]);
    }

    private function allBooks()
    {
        return BookResource::collection(Book::withCount('reviews')->get());
    }
}
