<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'state_id', 'user_id', 'due_at', 'project_id'
    ];

    /** @var array */
    protected $casts = [
        'state_id' => 'integer',
        'user_id' => 'integer',
        'project_id' => 'integer'
//        'due_at' => 'datetime'
    ];

    /**
     * デフォルト値
     * @var array
     */
    protected $attributes = [
        'user_id' => null,
        'state_id' => 0,
        'project_id' => 1
    ];
}
