<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReviewRequest;
use App\Http\Resources\ReviewResource;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index(Request $request)
    {
        $reviews = Review::query()
            ->with('reviewer')
            ->when(
                $request->filled('book_id'),
                fn ($query) => $query->where('book_id', $request->integer('book_id'))
            )
            ->latest('id')
            ->get();

        return ReviewResource::collection($reviews);
    }

    public function store(StoreReviewRequest $request)
    {
        $data = $request->validated();

        if (empty($data['user_id']) && $request->user()) {
            $data['user_id'] = $request->user()->id;
        }

        $review = Review::create($data);

        return $this->reviewsForBook($review->book_id);
    }

    public function update(StoreReviewRequest $request, Review $review)
    {
        $review->update($request->validated());

        return $this->reviewsForBook($review->book_id);
    }

    public function destroy(Review $review)
    {
        $review->delete();

        return response()->json([
            'message' => 'Review succesvol verwijderd',
        ]);
    }

    private function reviewsForBook(int $bookId)
    {
        $reviews = Review::query()
            ->with('reviewer')
            ->where('book_id', $bookId)
            ->latest('id')
            ->get();

        return ReviewResource::collection($reviews);
    }
}
