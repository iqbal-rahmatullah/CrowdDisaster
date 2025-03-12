<?php

use App\Modules\Enums\ReportStatus;
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
        Schema::create('repports', function (Blueprint $table) {
            $table->id('id');
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('latitude');
            $table->string('longitude');
            $table->text('address');
            $table->string('title');
            $table->text('description');
            $table->enum('status', ReportStatus::values())->default(ReportStatus::NEED_SUPPORT);
            $table->double('radius');
            $table->json('additional_information')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('repports');
    }
};
