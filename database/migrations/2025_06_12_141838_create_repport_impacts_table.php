<?php

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
        Schema::create('repport_impacts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('repport_id')->constrained('repports')->cascadeOnDelete();
            $table->integer('victim_died');
            $table->integer('victim_injured');
            $table->integer('damaged_house');
            $table->integer('damaged_building');
            $table->integer('damaged_village');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('repport_impacts');
    }
};
