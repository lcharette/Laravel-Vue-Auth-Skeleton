# Laravel-Vue-Auth-Skeleton

<!-- [![][app-version]][app-releases] -->

| Branch | Build | Coverage | Style |
| ------ |:-----:|:--------:|:-----:|
[master][app]  | [![][app-build-master]][app-build] | [![][app-master-codecov]][app-codecov] | [![][app-style-master]][app-style]
<!--[develop][app-develop] | [![][app-develop-build]][app-travis] | [![][app-develop-codecov]][app-codecov] | [![][app-style-develop]][app-style]-->

<!-- Sprinkles Links -->
[app]: https://github.com/lcharette/Laravel-Vue-Auth-Skeleton
[app-build]: https://github.com/lcharette/Laravel-Vue-Auth-Skeleton/actions?query=workflow%3ABuild
[app-build-master]: https://github.com/lcharette/Laravel-Vue-Auth-Skeleton/workflows/Build/badge.svg?branch=master
[app-build-deevelop]: https://github.com/lcharette/Laravel-Vue-Auth-Skeleton/workflows/Build/badge.svg?branch=develop
[app-develop]: https://github.com/lcharette/Laravel-Vue-Auth-Skeleton/tree/develop
[app-version]: https://img.shields.io/github/release/lcharette/Laravel-Vue-Auth-Skeleton.svg
[app-master-codecov]: https://codecov.io/gh/lcharette/Laravel-Vue-Auth-Skeleton/branch/master/graph/badge.svg?token=U19ULFV7SO
[app-develop-codecov]: https://codecov.io/gh/lcharette/Laravel-Vue-Auth-Skeleton/branch/develop/graph/badge.svg?token=U19ULFV7SO
[app-releases]: https://github.com/lcharette/Laravel-Vue-Auth-Skeleton/releases
[app-codecov]: https://codecov.io/gh/lcharette/Laravel-Vue-Auth-Skeleton
[app-style-master]: https://github.com/lcharette/Laravel-Vue-Auth-Skeleton/workflows/Style%20CI/badge.svg?branch=master
[app-style-develop]: https://github.com/lcharette/Laravel-Vue-Auth-Skeleton/workflows/Style%20CI/badge.svg?branch=develop
[app-style]: https://github.com/lcharette/Laravel-Vue-Auth-Skeleton/actions?query=workflow%3A%22Style+CI%22

Basic skeleton app based on Laravel, with Vue.js frontend and basic authentification.


**This is still a work in progress and to be used as reference only**

# TODO 
- Implement registration frontend
- Implement password forget
- Implement user verification 
- Add frontend tests

# Installation 

```
composer install
npm install
```

You then need to setup the db (copy `.env.example` to `.env` and fill in database information) and run migrations : 

```
php artisan migrate
```

Finally generate Laravel app key and the JWT Secret :

```
php artisan key:generate
php artisan jwt:secret
```

# To run 

Run simutanously : 

```
php artisan serve
```

```
npm run watch-poll
```

Site will be accessible at http://localhost:8000/ 
