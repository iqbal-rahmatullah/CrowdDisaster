<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DisasterPostRefugeeRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'nik' => 'required|string|max:16',
            'phone' => 'required|string|max:15',
            'gender' => 'required|in:male,female'
        ];
    }

    public function messages(): array
    {
        return [
            'disaster_post_id.required' => 'ID posko bencana harus diisi.',
            'disaster_post_id.exists' => 'Posko bencana tidak ditemukan.',
            'name.required' => 'Nama harus diisi.',
            'nik.required' => 'NIK harus diisi.',
            'phone.required' => 'Nomor telepon harus diisi.',
        ];
    }
}
