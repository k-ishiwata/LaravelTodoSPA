<?php

use Illuminate\Database\Seeder;

class ProjectsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('projects')->insert([
            [
                'title' => '未分類',
                'created_at' => '2018-10-02 14:28:19',
                'updated_at' => '2018-10-02 14:28:19'
            ],[
                'title' => '最初のプロジェクト',
                'created_at' => '2018-10-04 14:28:19',
                'updated_at' => '2018-10-04 14:28:19'
            ]
        ]);
    }
}
