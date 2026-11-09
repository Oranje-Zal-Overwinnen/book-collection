<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Author;
use App\Http\Resources\AuthorResource;

class AuthorController extends Controller
{
    public function index()
    {
        return AuthorResource::collection(Author::all());
    }
}
