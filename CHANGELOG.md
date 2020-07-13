# [2.0.0](https://github.com/Kesin11/ts-junit2json/compare/v1.0.2...v2.0.0) (2020-07-13)


### Features

* Remove parseWithOptions ([25be28b](https://github.com/Kesin11/ts-junit2json/commit/25be28b5e1743611ae1b0280b27d877fa0a9c1ad))
* Support XML that has not testsuites tag ([3dce88e](https://github.com/Kesin11/ts-junit2json/commit/3dce88ebfdda57882ec014fd917865c16c20c3d0))


### BREAKING CHANGES

* parse() will return Promise<TestSuites> | Promise<TestSuite> now
* Fix parse accept xml2jsOptions



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
