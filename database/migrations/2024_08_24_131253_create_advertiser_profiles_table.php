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
        Schema::create('advertiser_profiles', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('user_id');

            $table->string("cover_image");
            $table->string("logo");
            $table->string("name");
            $table->string("email");
            $table->string("contact");
            $table->mediumText("bio");


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('advertiser_profiles');
    }
};
