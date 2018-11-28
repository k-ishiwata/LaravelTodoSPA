<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'name' => '管理者',
                'login_id' => 'admin',
                'email' => 'admin@example.com',
                'password' => bcrypt('123456'),
                'remember_token' => null,
                'created_at' => '2018-10-02 14:28:19',
                'updated_at' => '2018-10-02 14:28:19'
            ]
        ]);
    }
}
