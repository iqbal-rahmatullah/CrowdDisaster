<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DisasterPostRequest extends FormRequest
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
    public function rules()
    {
        return [
            'title' => ['required', 'string', 'min:1'],
            'description' => ['required', 'string', 'min:1'],
            'quota' => ['required', 'integer', 'min:1'],
            'contact' => ['required', 'string', 'min:1'],
            'address' => ['required', 'string', 'min:1'],
            'image' => ['file', 'mimes:jpeg,png,webp', 'max:5120'],
            'latitude' => ['required', 'string', 'min:1'],
            'longitude' => ['required', 'string', 'min:1'],
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'Judul tidak boleh kosong',
            'description.required' => 'Deskripsi tidak boleh kosong',
            'quota.required' => 'Kuota tidak boleh kosong',
            'quota.min' => 'Kuota harus lebih besar dari 0',
            'contact.required' => 'Kontak tidak boleh kosong',
            'address.required' => 'Alamat tidak boleh kosong',
            'image.mimes' => 'File harus berupa gambar',
            'latitude.required' => 'Latitude tidak boleh kosong',
            'longitude.required' => 'Longitude tidak boleh kosong',
        ];
    }
}
