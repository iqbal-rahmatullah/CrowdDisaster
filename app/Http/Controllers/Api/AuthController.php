<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        if (!$token = Auth::guard('api')->attempt($validator->validated())) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 401);
        }

        try {
            $userValid = User::where('email', $request->email)->first();

            // if ($userValid->phone_number_verified_at == null) {
            //     $validOtp = $this->otpService->generateOtp();

            //     $userValid->update(['kode_otp' => $validOtp]);

            //     return response()->json([
            //         'success' => true,
            //         'message' => 'Akun belum diverifikasi, cek nomor telpon untuk verifikasi kode OTP nya ',
            //         'data' => [
            //             'nomor_telepon' => $userValid->nomor_telepon,
            //             'is_verifikasi' => false,
            //             'token' => $token,
            //             'kode_otp' => $validOtp,
            //         ],
            //     ], 201);
            // }

            return response()->json([
                'success' => true,
                'message' => 'Login berhasil',
                'data' => [
                    'is_verifikasi' => true,
                    'token' => $token,
                ],
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'internal server error',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function logout()
    {
        Auth::guard('api')->logout();

        return response()->json([
            'success' => true,
            'message' => 'Successfully logged out',
        ], 200);
    }
}
