<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\User;

class TaskTest extends TestCase
{
    use RefreshDatabase;

    public function setUp()
    {
        parent::setUp();
        $this->artisan('db:seed');

        // ログイン認証
        $user = factory(User::class)->create();
        $this->actingAs($user, 'api');
    }

    /**
     * @test
     */
    public function tasksにGETでアクセスできる()
    {
        $response = $this->get('api/tasks');
        $response->assertStatus(200);
    }

    /**
     * @test
     */
    public function tasksにPOSTでアクセスできる()
    {
        $task = [
            'title' => 'テストタイトル',
            'state_id' => 1,
            'user_id' => 1
        ];

        $response = $this->postJson('api/tasks', $task);
        $response->assertStatus(200);
    }

    /**
     * @test
     */
    public function tasks_idにPUTでアクセスできる()
    {
        $response = $this->put('api/tasks/1', ['title' => '書き換え']);
        $response->assertStatus(200);
    }

    /**
     * @test
     */
    public function tasks_idにDELETEでアクセスできる()
    {
        $response = $this->delete('api/tasks/1');
        $response->assertStatus(204);
    }

    /**
     * @test
     */
    public function GETでアクセスするとjsonが返却()
    {
        $response = $this->get('api/tasks');
        $this->assertThat($response->content(), $this->isJson());
    }

    /**
     * @test
     */
    public function SHOWで取得情報は正しいか()
    {
        $response = $this->get('api/tasks/1');
        $response->assertJson([
            'title' => 'はじめてのタスク'
        ])->assertStatus(200);
    }

    /**
     * @test
     */
    public function GETで取得できるjsonは要件通りである()
    {
        $response = $this->get('api/tasks');
        $tasks = $response->json();
        $task = $tasks[0];
        $this->assertSame(['id', 'title', 'state_id', 'user_id', 'due_at', 'created_at', 'updated_at'], array_keys($task));
    }

    /**
     * @test
     */
    public function GETの取得件数は2件である()
    {
        $response = $this->get('api/tasks');
        $response->assertJsonCount(2);
    }

    /**
     * @test
     */
    public function POSTでデータが追加される()
    {
        $params = [
            'title' => 'テストタイトル',
            'state_id' => '1',
            'user_id' => '1'
        ];
        $this->postJson('api/tasks', $params);
        $this->assertDatabaseHas('tasks', $params);

//        $response->assertStatus(200);
    }

    /**
     * @test
     */
    public function POSTでtitleが未入力のエラー()
    {
        $params = [
            'state_id' => '2',
            'user_id' => '2'
        ];
        $response = $this->postJson('api/tasks', $params);

//        $response->assertSee(json_encode('タイトルは必ず入力してください。'));
//        $response->assertJson(['message' => 'The given data was invalid.']);
        $response->assertJsonFragment(['title' => ['タイトルは必ず入力してください。']]);

//        $errorResponse = [
//            'message' => 'The given data was invalid.',
//            'errors' => [
//                'title' => [
//                    'タイトルは必ず入力してください。'
//                ]
//            ]
//        ];
//        $respose->assertExactJson($errorResponse);
    }

    /**
     * @test
     */
    public function UPDATEで情報は更新されるか()
    {
        $params = [
            'title' => '書き換えたタイトル'
        ];
        $response = $this->putJson('api/tasks/1', $params);

        $response->assertJsonFragment($params);
//        $this->assertTrue($respose->json());
        $this->assertDatabaseHas('tasks', $params);
    }
    /**
     * @test
     */
    public function UPDATEでデータがない場合はエラー()
    {
        $params = [
            'title' => '書き換えたタイトル'
        ];
        $response = $this->putJson('api/tasks/100', $params);

//        dd($response->content());

        $response->assertStatus(500);
    }

    /**
     * @test
     */
    public function DALETEで情報は削除されるか()
    {
        $params = [
            'id' => 1
        ];
        $this->deleteJson('api/tasks/1');
        $this->assertDatabaseMissing('tasks', $params);
    }

    /**
     * @test
     */
    public function DALETEでデータがない場合エラー()
    {
        $this->deleteJson('api/tasks/100')->assertStatus(409);


//        dd($response->status());

    }
}
