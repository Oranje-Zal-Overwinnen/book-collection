<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\BookResource;
use App\Models\Book;

class BookController extends Controller
{
    public function index()
    {
        return BookResource::collection(Book::all());
    }
}
