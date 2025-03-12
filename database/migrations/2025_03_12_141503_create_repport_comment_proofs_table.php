<?php

use App\Modules\Enums\ProofFileType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('repport_comment_proofs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('repport_comment_id')->constrained('repport_comments')->cascadeOnDelete();
            $table->string('file_path');
            $table->enum('file_type', ProofFileType::values());
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('repport_comment_proofs');
    }
};
