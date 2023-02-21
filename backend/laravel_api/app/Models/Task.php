<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Task extends Model
{
    use HasFactory;

    protected $table = "tasks";

    protected $guarded = [];

    public function categories()
    {
        return $this->hasMany(TaskCategory::class)
                    ->join('categories', 'categories.id', 'task_categories.category_id')
                    ->where('is_active', 1);
    }
}
