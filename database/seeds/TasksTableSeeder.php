<?php

use Illuminate\Database\Seeder;

class TasksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tasks')->insert([
            [
                'title' => 'はじめてのタスク',
                'state_id' => 1,
                'user_id' => 1,
                'due_at' => '2018-10-02 14:28:19',
                'created_at' => '2018-10-02 14:28:19',
                'updated_at' => '2018-10-02 14:28:19'
            ],[
                'title' => '2番目のタスク',
                'state_id' => 2,
                'user_id' => 1,
                'due_at' => '',
                'created_at' => '2018-10-04 14:28:19',
                'updated_at' => '2018-10-04 14:28:19'
            ]
        ]);
    }
}
