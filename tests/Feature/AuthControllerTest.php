<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testLogin(): void
    {
        $user = factory(User::class)->create();
        $response = $this->actingAs($user)->post('/api/login', [
            'email'    => $user->email,
            'password' => 'password',
        ]);

        $expectedStructure = [
            'access_token',
            'token_type',
            'expires_in'
        ];

        $response
            ->assertStatus(200)
            ->assertJsonStructure($expectedStructure);

        $this->assertAuthenticated('api');
    }

    public function testLoginWithWrongPassword(): void
    {
        $user = factory(User::class)->create();
        $response = $this->actingAs($user)->post('/api/login', [
            'email'    => $user->email,
            'password' => 'fooBar',
        ]);

        $response
            ->assertStatus(403)
            ->assertJson(['error' => 'Unauthorized']);
    }

    public function testLogout(): void
    {
        $user = factory(User::class)->create();
        $token = JWTAuth::fromUser($user);

        $response = $this->actingAs($user)->post('/api/logout?token=' . $token);

        $response
            ->assertStatus(200)
            ->assertJson(['message' => 'Successfully logged out']);

        $this->assertGuest('api');
    }

    public function testRefresh(): void
    {
        $user = factory(User::class)->create();
        $token = JWTAuth::fromUser($user);

        $response = $this->actingAs($user)->post('/api/refresh?token=' . $token);

        $expectedStructure = [
            'access_token',
            'token_type',
            'expires_in'
        ];

        $response
            ->assertStatus(200)
            ->assertJsonStructure($expectedStructure);
    }

    public function testUser(): void
    {
        $user = factory(User::class)->create();
        $response = $this->actingAs($user)->get('/api/user');

        $expectedStructure = [
            'status',
            'data',
        ];

        $response
            ->assertStatus(200)
            ->assertJsonStructure($expectedStructure);
    }

    /**
     * @depends testUser
     */
    public function testUserWithNoAccount(): void
    {
        $response = $this->get('/api/user');

        $response
            ->assertStatus(401)
            ->assertJson(['error' => 'Unauthorized']);
    }
}
