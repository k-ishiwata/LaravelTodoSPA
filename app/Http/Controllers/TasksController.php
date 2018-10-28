<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Repositories\Repository;
use App\Http\Requests\TaskRequest;

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
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $tasks = $this->repository->all();
        return response()->json($tasks);
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        return response()->json($this->repository->findById($id));
    }

    /**
     * @param TaskRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(TaskRequest $request)
    {
        $response = $this->repository->store($request->all());
        return response()->json($response, 201);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(TaskRequest $request, int $id)
    {
        $response = $this->repository->update($request->all(), $id);
        return response()->json($response, 200);
    }

    /**
     * @param $id
     * @return int
     */
    public function destroy($id)
    {
        return $this->repository->delete($id);
    }
}