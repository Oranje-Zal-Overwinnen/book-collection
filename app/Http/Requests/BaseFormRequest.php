<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

class BaseFormRequest extends FormRequest
{
    /**
        * Handle a failed validation attempt.
        *
        * @param \Illuminate\Contracts\Validation\Validator $validator
        *
        * @return void
        *
        * @throws \Illuminate\Http\Exceptions\HttpResponseException
        */
    protected function failedValidation(Validator $validator): void
    {
        throw new HttpResponseException(new JsonResponse([
            'errors' => $validator->errors(),
            'message' => 'De ingevoerde gegevens zijn niet juist',
        ], 422));
    }
}
