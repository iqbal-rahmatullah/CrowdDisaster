<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DisasterPostProgressionRequest extends FormRequest
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
            'progression' => 'required|string|max:255',
            'proof' => 'nullable|array',
            'proof.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ];
    }

    public function messages()
    {
        return [
            'progression.required' => 'Progress tidak boleh kosong',
            'progression.string' => 'Progress harus berupa teks',
            'progression.max' => 'Progress tidak boleh lebih dari 255 karakter',
            'proof.image' => 'File harus berupa gambar',
            'proof.mimes' => 'File harus berupa gambar dengan format jpeg, png, jpg, atau gif',
            'proof.max' => 'Ukuran file tidak boleh lebih dari 2MB',
        ];
    }
}
