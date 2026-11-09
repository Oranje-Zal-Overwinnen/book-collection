<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\BookResource;
use App\Models\Book;
use App\Http\Requests\StoreBookRequest;

class BookController extends Controller
{
    public function index()
    {
        return BookResource::collection(Book::all());
    }

    public function store(StoreBookRequest $request)
    {
        $book = Book::create($request->validated());

        $books = Book::all();
        return BookResource::collection($books);
    }

    public function update(StoreBookRequest $request, Book $book)
    {
        $book->update($request->validated());

        $books = Book::all();
        return BookResource::collection($books);
    }
}
