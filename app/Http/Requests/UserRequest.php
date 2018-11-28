<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|max:20'
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'タイトルは必ず入力してください。',
            'name.max' => 'タイトルは20文字以内で入力してください。',
        ];
    }
}
