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

# Test publishing from local purpose
prepublish:
  LOCALLY
  COPY +build/dist dist/
  RUN npm version prerelease --no-git-tag-version && \
      npm publish --provenance --tag=beta

publish:
  LOCALLY
  ARG --required VERSION
  COPY +build/dist dist/
  RUN npm version $VERSION && \
      npm publish --provenance
