<?php

use App\Modules\Enums\RepportType;
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
        Schema::table('repports', function (Blueprint $table) {
            $table->enum('type', RepportType::values())->after('description');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('repports', function (Blueprint $table) {
            $table->dropColumn('type');
        });
    }
};
