# [3.0.0](https://github.com/Kesin11/ts-junit2json/compare/v2.0.6...v3.0.0) (2022-02-02)



## [2.0.6](https://github.com/Kesin11/ts-junit2json/compare/v2.0.5...v2.0.6) (2022-01-19)
Remove shipjs from package.json [#130](https://github.com/Kesin11/ts-junit2json/issues/120) 

It also fixes some Dependabot alerts.


## [2.0.5](https://github.com/Kesin11/ts-junit2json/compare/v2.0.4...v2.0.5) (2021-10-04)


### Bug Fixes

* CLI does not work when no -f option ([d5f13ec](https://github.com/Kesin11/ts-junit2json/commit/d5f13ecb2d3e5829827eb81e35c8434f7732dee1))



## [2.0.4](https://github.com/Kesin11/ts-junit2json/compare/v2.0.3...v2.0.4) (2021-10-02)

Bump dependencies

## [2.0.3](https://github.com/Kesin11/ts-junit2json/compare/v2.0.2...v2.0.3) (2021-05-19)

Bump dependencies to fix security vulnerability.


## [2.0.2](https://github.com/Kesin11/ts-junit2json/compare/v2.0.1...v2.0.2) (2021-01-17)


### Bug Fixes

* npm audit fix ([0b88e44](https://github.com/Kesin11/ts-junit2json/commit/0b88e441d077f14e0443b7260393b65b0ff78335))



## [2.0.1](https://github.com/Kesin11/ts-junit2json/compare/v2.0.0...v2.0.1) (2020-10-07)

Bump dependencies to fix security vulnerability.

* npm audit fix ([977bd8c](https://github.com/Kesin11/ts-junit2json/commit/977bd8c99fd569527f7a9f6411092e52c0aea98e))
* bump node-fetch from 2.6.0 to 2.6.1 [#28](https://github.com/Kesin11/ts-junit2json/pull/28)


# [2.0.0](https://github.com/Kesin11/ts-junit2json/compare/v1.0.2...v2.0.0) (2020-07-13)


### Features

* Remove parseWithOptions() ([25be28b](https://github.com/Kesin11/ts-junit2json/commit/25be28b5e1743611ae1b0280b27d877fa0a9c1ad))
* Support XML that has not testsuites tag ([3dce88e](https://github.com/Kesin11/ts-junit2json/commit/3dce88ebfdda57882ec014fd917865c16c20c3d0))


### BREAKING CHANGES

* parse() will return `Promise<TestSuites> | Promise<TestSuite>` type now
* Fix parse() accepting xml2jsOptions



## [1.0.2](https://github.com/Kesin11/ts-junit2json/compare/v1.0.1...v1.0.2) (2020-06-09)


### Bug Fixes

* Fix: bugfix @types/xml2js type error when import junit2json with TypeScript ([285eb8](https://github.com/Kesin11/ts-junit2json/commit/285eb82cc0f3a786d86787c68227a91c3cb86ba4))


## [1.0.1](https://github.com/Kesin11/ts-junit2json/compare/v1.0.0...v1.0.1) (2020-05-13)


* **docs:** Fix README ([d3a1c88](https://github.com/Kesin11/ts-junit2json/commit/d3a1c881194988754c79bd2563cf5a94ea6a5ea2))



# [1.0.0](https://github.com/Kesin11/ts-junit2json/compare/v0.1.3...v1.0.0) (2020-05-13)


### Features

* **cli:** Add CLI interface ([a87e64b](https://github.com/Kesin11/ts-junit2json/commit/a87e64b805a1fab674678b1e5586589d50d613c4))



## [0.1.3](https://github.com/Kesin11/ts-junit2json/compare/v0.1.2...v0.1.3) (2020-02-08)


### Bug Fixes

* Fix incorrect type name TestSuites.error to TestSuites.errors ([bb191b4](https://github.com/Kesin11/ts-junit2json/commit/bb191b4215873568e82e659c5a740e133614a8de))



## [0.1.2](https://github.com/Kesin11/ts-junit2json/compare/v0.1.1...v0.1.2) (2020-02-05)


### Bug Fixes

* **package:** Add 'types' in package.json ([3383bef](https://github.com/Kesin11/ts-junit2json/commit/3383befc8e6e05eea18dbfdb48aea9aba97aa6e8))



## [0.1.1](https://github.com/Kesin11/ts-junit2json/compare/v0.1.0...v0.1.1) (2020-02-05)


### Bug Fixes

* **package:** npm publish only dist/ ([600715b](https://github.com/Kesin11/ts-junit2json/commit/600715ba02575c1d6876a18d2df4b878a2782026))



# 0.1.0 (2020-02-02)

Initial release.
