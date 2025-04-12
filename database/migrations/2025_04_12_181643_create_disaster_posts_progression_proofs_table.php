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
        Schema::create('disaster_posts_progression_proofs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('disaster_posts_progressions_id');
            $table->foreign('disaster_posts_progressions_id', 'fk_post_progression_proof')
                ->references('id')
                ->on('disaster_posts_progressions')
                ->onDelete('cascade');
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
        Schema::dropIfExists('disaster_posts_progression_proofs');
    }
};
