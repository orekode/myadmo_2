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
        Schema::create('adverts', function (Blueprint $table) {

            $table->id();

            $table->string('title');
            $table->longText('description');
            $table->string('advert');
            $table->decimal('aspect_ratio');
            $table->string('gender');

            $table->date('end_date');
            $table->date('start_date');

            $table->integer('end_age');
            $table->integer('start_age');

            $table->unsignedBigInteger("user_id");
            $table->unsignedBigInteger("profile_id");

            $table->string("reference");
            $table->string("status")->default("pending");

            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('adverts');
    }
};
