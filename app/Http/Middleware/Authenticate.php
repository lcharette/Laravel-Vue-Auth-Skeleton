<?php
/**
 * Laravel Vue & Auth Skeleton
 *
 * @author    Louis Charette
 * @copyright Copyright (c) 2020 Louis Charette
 * @link      https://github.com/lcharette/Laravel-Vue-Auth-Skeleton
 * @license   https://github.com/lcharette/Laravel-Vue-Auth-Skeleton/blob/master/LICENSE.md (MIT License)
 */

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    // Override handle method
    public function handle($request, Closure $next, ...$guards)
    {
        if ($this->authenticate($request, $guards) === false) {
            return response()->json(['error'=>'Unauthorized'], 401);
        }

        return $next($request);
    }

    // Override authentication method
    protected function authenticate($request, array $guards)
    {
        if (empty($guards)) {
            $guards = [null];
        }
        foreach ($guards as $guard) {
            if ($this->auth->guard($guard)->check()) {
                return $this->auth->shouldUse($guard);
            }
        }

        return false;
    }
}
