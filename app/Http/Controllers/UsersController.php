<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Repositories\Repository;
use App\Http\Requests\UserRequest;

class UsersController extends Controller
{
    /** @var Repository */
    protected $repository;

    /**
     * UsersController constructor.
     * @param User $user
     */
    public function __construct(User $user)
    {
        $this->repository = new Repository($user);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $users = $this->repository->all();
//        return response()->json($users, 200, [], JSON_NUMERIC_CHECK);
        return response()->json($users);
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
     * @param UserRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(UserRequest $request)
    {
        $response = $this->repository->store($request->all());
        return response()->json($response);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UserRequest $request, int $id)
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