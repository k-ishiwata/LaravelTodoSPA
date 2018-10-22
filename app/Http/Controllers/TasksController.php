<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Repositories\Repository;

class TasksController extends Controller
{
    /** @var Repository */
    protected $repository;

    /**
     * TasksController constructor.
     * @param Task $task
     */
    public function __construct(Task $task)
    {
        $this->repository = new Repository($task);
    }

    /**
     * @return \Illuminate\View\View
     */
    public function index()
    {
        $tasks = $this->repository->all();
        return response()->json($tasks);
    }
}
