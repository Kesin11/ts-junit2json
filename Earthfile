VERSION 0.7

FROM node:20.13.1
WORKDIR /build

build:
  COPY package.json package-lock.json .
  CACHE /root/.npm
  RUN npm ci

  COPY --dir src tsconfig*.json .
  RUN npm run build
  SAVE ARTIFACT dist/ dist

integate-test:
  FROM +build
  COPY --dir integrate_tests __tests__ .
  RUN rm -rf dist
  COPY +build/dist dist

  RUN npm run integrate_test

# Test publishing from local purpose
prepublish:
  BUILD +integate-test
  LOCALLY
  RUN rm -rf dist
  COPY +build/dist dist

  RUN npm version prerelease --no-git-tag-version && \
      npm publish --provenance --tag=beta

publish:
  BUILD +integate-test
  LOCALLY
  ARG --required VERSION
  RUN rm -rf dist
  COPY +build/dist dist

  RUN npm version $VERSION && \
      npm publish --provenance
