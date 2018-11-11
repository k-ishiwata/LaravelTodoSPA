<?php
namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;

class Repository
{
    /**
     * @var Model
     */
    protected $model;

    /**
     * @param Model $model
     */
    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    /**
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function all()
    {
        return $this->model->all();
    }

    /**
     * @param array $data
     * @return mixed
     */
    public function store(array $data)
    {
        return $this->model->create($data);
    }

    /**
     * @param array $data
     * @param int $id
     * @return mixed
     */
    public function update(array $data, int $id)
    {
        $record = $this->model->find($id);
        $record->update($data);
        return $record;
    }

    /**
     * @param int $id
     * @return mixed
     */
    public function delete(int $id)
    {
        return $this->model->destroy($id);
    }

    /**
     * @param int $id
     * @return mixed
     */
    public function findById(int $id)
    {
        return $this->model->findOrFail($id);
    }

    /**
     * @return Model
     */
    public function getModel()
    {
        return $this->model;
    }

    /**
     * @param Model $model
     * @return $this
     */
    public function setModel(Model $model)
    {
        $this->model = $model;
        return $this;
    }

    /**
     * @param $relations
     * @return \Illuminate\Database\Eloquent\Builder|Model
     */
    public function with($relations)
    {
        return $this->model->with($relations);
    }

    /**
     * 最後のレコードを取得
     * @return Model
     */
    public function latest()
    {
        return $this->model->latest()->first();
    }

    /**
     * レコード総数を取得
     * @return int
     */
    public function count()
    {
        return $this->model->count();
    }
}