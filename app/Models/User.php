<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

/**
 * @property int $id
 * @property string $username
 * @property string $first_name
 * @property string $last_name
 * @property string $email
 * @property bool $flag_verified
 * @property bool $flag_enabled
 * @property string $password
 * @property \Datetime $created_at
 * @property \Datetime $updated_at
 * @property \Datetime $deleted_at
 */
class User extends Authenticatable implements JWTSubject
{
    use Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'username',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
    ];

    /**
     * The dynamic attributes added at runtime.
     *
     * @var array
     */
    protected $appends = [
        'full_name',
        'avatar'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'flag_verified' => 'boolean',
        'flag_enabled'  => 'boolean',
    ];

    /**
     * Allows you to get the full name of the user using `$user->full_name`.
     *
     * @return string
     */
    public function getFullNameAttribute(): string
    {
        return $this->first_name . ' ' . $this->last_name;
    }

    /**
     * Allows you to get the full name of the user using `$user->full_name`.
     *
     * @return string
     */
    public function getAvatarAttribute(): string
    {
        // Use Gravatar as the user avatar
        $hash = md5(strtolower(trim($this->email)));

        return 'https://www.gravatar.com/avatar/' . $hash . '?d=mm';
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}
