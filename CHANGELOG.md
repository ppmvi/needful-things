# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.1.0](https://github.com/ppmvi/needful-things/compare/v2.0.0...v2.1.0) (2021-04-19)


### Features

* rewrite to typescript ([063b0b8](https://github.com/ppmvi/needful-things/commit/063b0b833b556e34e827919db79edc5aa3fb1899))


### Bug Fixes

* fixed name for components ([f247f67](https://github.com/ppmvi/needful-things/commit/f247f670f0b29426b7125314820eb40319d1c1cc))

## [2.0.0](https://github.com/ppmvi/needful-things/compare/v1.5.1...v2.0.0) (2020-05-06)

### Breaking

* changed prop in TelLink component from `wrapper` to `doNotShowTel` 

### Features

* rewrite to typescript ([8dfb5de](https://github.com/ppmvi/needful-things/commit/8dfb5de672c49df1836010aceaf7ac8170b1abd5))


### Bug Fixes

* fixed typing ([e48fdd3](https://github.com/ppmvi/needful-things/commit/e48fdd31d67de4b37ead2b9305cdace3c596fb09))

## [1.5.1](https://github.com/ppmvi/needful-things/compare/v1.5.0...v1.5.1) (2019-04-18)


### Bug Fixes

* **applyFacebookMetaTags:** added url meta tag ([bea595f](https://github.com/ppmvi/needful-things/commit/bea595f))
* **EmailLink:** remove email from aria-label ([c8c6517](https://github.com/ppmvi/needful-things/commit/c8c6517))



# [1.5.0](https://github.com/ppmvi/needful-things/compare/v1.4.1...v1.5.0) (2019-04-16)


### Bug Fixes

* **deps:** pinned dependencies ([cbbd652](https://github.com/ppmvi/needful-things/commit/cbbd652))
* **deps:** upgraded packages ([b2f663c](https://github.com/ppmvi/needful-things/commit/b2f663c))
* **tinify:** quit process when all images have already been compressed ([3062680](https://github.com/ppmvi/needful-things/commit/3062680))
* **tinify:** replaced lodash reduce with native method ([ea81bdb](https://github.com/ppmvi/needful-things/commit/ea81bdb))
* **tinify:** stop process when key is not valid and stop inquirer when compression should not be started ([313d7de](https://github.com/ppmvi/needful-things/commit/313d7de))


### Features

* **tinify:** add meta comment to images after compression ([0b9cfa6](https://github.com/ppmvi/needful-things/commit/0b9cfa6))



## [1.4.1](https://github.com/ppmvi/needful-things/compare/v1.4.0...v1.4.1) (2019-04-11)



# [1.4.0](https://github.com/ppmvi/needful-things/compare/v1.3.2...v1.4.0) (2019-04-11)


### Bug Fixes

* removed src folder from files in package.json ([e2cb0a1](https://github.com/ppmvi/needful-things/commit/e2cb0a1))
* **cli:** removed lodash merge from favicon config ([3506e85](https://github.com/ppmvi/needful-things/commit/3506e85))
* **deps:** replaced cross-spawn with execa ([671a59c](https://github.com/ppmvi/needful-things/commit/671a59c))


### Features

* **cli:** added tinify command ([a0229b2](https://github.com/ppmvi/needful-things/commit/a0229b2))
* **cli:** moved to separate folder ([d9fd1e1](https://github.com/ppmvi/needful-things/commit/d9fd1e1))



## [1.3.2](https://github.com/ppmvi/needful-things/compare/v1.3.1...v1.3.2) (2019-04-08)


### Bug Fixes

* **applyFaviconLinks:** fixed default values for manifest attribute in options ([3079fc8](https://github.com/ppmvi/needful-things/commit/3079fc8))



## [1.3.1](https://github.com/ppmvi/needful-things/compare/v1.3.0...v1.3.1) (2019-04-08)


### Bug Fixes

* switched applyFaviconMetaTags and applyFaviconLinks methods ([ad296ef](https://github.com/ppmvi/needful-things/commit/ad296ef))



# [1.3.0](http://gitlab.ppm-vi.de/nodejs/needful-things/compare/v1.2.3...v1.3.0) (2019-04-08)


### Features

* added applyFaviconLinks and applyFaviconMetaTags methods. ([3338e61](http://gitlab.ppm-vi.de/nodejs/needful-things/commit/3338e61))



## [1.2.3](http://gitlab.ppm-vi.de/nodejs/needful-things/compare/v1.2.2...v1.2.3) (2019-04-05)


### Bug Fixes

* **deps:** moved relevant dependencies out of devDependencies ([83ffc5e](http://gitlab.ppm-vi.de/nodejs/needful-things/commit/83ffc5e))



## [1.2.2](http://gitlab.ppm-vi.de/nodejs/needful-things/compare/v1.2.1...v1.2.2) (2019-04-05)


### Bug Fixes

* added src directory to files in package.json ([8a5e798](http://gitlab.ppm-vi.de/nodejs/needful-things/commit/8a5e798))



## [1.2.1](http://gitlab.ppm-vi.de/nodejs/needful-things/compare/v1.2.0...v1.2.1) (2019-04-05)


### Bug Fixes

* added bin folder to files in package.json ([ac0514a](http://gitlab.ppm-vi.de/nodejs/needful-things/commit/ac0514a))



# [1.2.0](http://gitlab.ppm-vi.de/nodejs/needful-things/compare/v1.1.0...v1.2.0) (2019-04-05)


### Bug Fixes

* **favicons:** changed default path ([32fa290](http://gitlab.ppm-vi.de/nodejs/needful-things/commit/32fa290))
* **favicons:** custom path can be passed to cli tool ([4909e1c](http://gitlab.ppm-vi.de/nodejs/needful-things/commit/4909e1c))
* **splashscreen:** renamed function to applySplashscreenLinks ([4af982f](http://gitlab.ppm-vi.de/nodejs/needful-things/commit/4af982f))
* added path to help in executable for generate-favicons arg ([667a7ae](http://gitlab.ppm-vi.de/nodejs/needful-things/commit/667a7ae))


### Features

* generating favicons ([be6280c](http://gitlab.ppm-vi.de/nodejs/needful-things/commit/be6280c))
* introducing the new executable ppmvi ([86e6792](http://gitlab.ppm-vi.de/nodejs/needful-things/commit/86e6792))



# [1.1.0](http://gitlab.ppm-vi.de/nodejs/needful-things/compare/v1.0.1...v1.1.0) (2019-04-05)


### Features

* added applyFacebookMetaTags and applyTwitterMetaTags functions ([d0fb06e](http://gitlab.ppm-vi.de/nodejs/needful-things/commit/d0fb06e))
* added applySplashscreenMetaTags function ([4461f6e](http://gitlab.ppm-vi.de/nodejs/needful-things/commit/4461f6e))



## [1.0.1](http://gitlab.ppm-vi.de/nodejs/needful-things/compare/v1.0.0...v1.0.1) (2019-04-04)


### Bug Fixes

* **EmailLink:** changed email prop to be required ([5cd25f2](http://gitlab.ppm-vi.de/nodejs/needful-things/commit/5cd25f2))
* **TelLink:** changed tel prop to be required ([9b61765](http://gitlab.ppm-vi.de/nodejs/needful-things/commit/9b61765))
* fixed path for infile in release script ([f399336](http://gitlab.ppm-vi.de/nodejs/needful-things/commit/f399336))
* removed dryRun from standardVersion ([c649672](http://gitlab.ppm-vi.de/nodejs/needful-things/commit/c649672))



# 1.0.0 (2019-04-04)


### Features

* added EmailLink component ([2384920](http://gitlab.ppm-vi.de/nodejs/needful-things/commit/2384920))
* added TelLink component ([dd46511](http://gitlab.ppm-vi.de/nodejs/needful-things/commit/dd46511))
