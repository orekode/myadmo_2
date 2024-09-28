<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        return [
            "id"            => $this->id,
            "user_id"       => $this->user_id,

            "bio"           => $this->bio,
            "name"          => $this->name,
            "contact"       => $this->contact,

            "logo"          => env('STORAGE_DIR') . $this->logo,
            "coverImage"    => env('STORAGE_DIR') . $this->cover_image,
        ];
    }
}
