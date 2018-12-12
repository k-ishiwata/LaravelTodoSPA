<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Repositories\Repository;
use App\Http\Requests\ProjectRequest;

class ProjectsController extends Controller
{
    /** @var Repository */
    protected $repository;

    /**
     * ProjectsController constructor.
     * @param Project $task
     */
    public function __construct(Project $task)
    {
        $this->repository = new Repository($task);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $tasks = $this->repository->all();
//        return response()->json($tasks, 200, [], JSON_NUMERIC_CHECK);
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
     * @param ProjectRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(ProjectRequest $request)
    {
        $response = $this->repository->store($request->all());
        return response()->json($response);
    }

    /**
     * @param ProjectRequest $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(ProjectRequest $request, int $id)
    {
        $response = $this->repository->update($request->all(), $id);
        return response()->json($response);
    }

    /**
     * @param $id
     * @return mixed
     */
    public function destroy($id)
    {
        if ($this->repository->delete($id)) {
            return response()->json(null, 204);
        } else {
            return response()->json(null, 409);
        }
    }
}