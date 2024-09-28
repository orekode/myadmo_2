<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Abbasudo\Purity\Traits\Filterable;
use Abbasudo\Purity\Traits\Sortable;

class AdvertCategory extends Model
{
    use HasFactory, Filterable, Sortable;
    
    protected $guarded = [
        "id",
        "created_at",
        "updated_at",
    ];
}
