<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RepportImpactRequest extends FormRequest
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
            'victim_died' => 'required|integer|min:0',
            'victim_injured' => 'required|integer|min:0',
            'damaged_house' => 'required|integer|min:0',
            'damaged_building' => 'required|integer|min:0',
            'damaged_village' => 'required|integer|min:0',
        ];
    }

    public function messages(): array
    {
        return [
            'victim_died.required' => 'Jumlah korban meninggal diperlukan.',
            'victim_injured.required' => 'Jumlah korban luka diperlukan.',
            'damaged_house.required' => 'Jumlah rumah rusak diperlukan.',
            'damaged_building.required' => 'Jumlah bangunan rusak diperlukan.',
            'damaged_village.required' => 'Jumlah desa rusak diperlukan.',
            'min' => ':attribute tidak boleh kurang dari 0.',
        ];
    }
}
