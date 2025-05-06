<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RepportCommentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'comment' => 'required|string|max:255',
            'proof' => 'nullable|array',
            'proof.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ];
    }

    public function messages()
    {
        return [
            'comment.required' => 'Komentar tidak boleh kosong',
            'comment.string' => 'Komentar harus berupa teks',
            'comment.max' => 'Komentar tidak boleh lebih dari 255 karakter',
            'proof.image' => 'File harus berupa gambar',
            'proof.mimes' => 'File harus berupa gambar dengan format jpeg, png, jpg, atau gif',
            'proof.max' => 'Ukuran file tidak boleh lebih dari 2MB',
        ];
    }
}
