VERSION 0.8

FROM node:22.15.0
WORKDIR /build

build:
  COPY package.json package-lock.json .
  CACHE /root/.npm
  RUN npm ci

  COPY --dir src tsconfig*.json .
  RUN npm run build
  SAVE ARTIFACT dist/ dist

integrate-test:
  FROM +build
  COPY --dir integrate_tests tests .
  RUN rm -rf dist
  COPY +build/dist dist

  RUN npm run integrate_test

# Test publishing from local purpose
prepublish:
  BUILD +integrate-test
  LOCALLY
  RUN rm -rf dist
  COPY +build/dist dist

  # Bump package.json and jsr.json then commit the changes that mimic `npm version`
  RUN npm version prerelease --no-git-tag-version && \
      npm run jsr:version && \
      git add jsr.json package*.json && \
      jq -r '.version' package.json | xargs -I {} git commit -m "{}"
  RUN npm publish --provenance --tag=beta
  RUN npm install && npx -y jsr publish

publish:
  BUILD +integrate-test
  LOCALLY
  ARG --required VERSION
  RUN rm -rf dist
  COPY +build/dist dist

  RUN npm version $VERSION && \
      npm run jsr:version && \
      git add jsr.json package*.json && \
      jq -r '.version' package.json | xargs -I {} git commit -m "{}"
  RUN npm publish --provenance
  RUN npm install && npx -y jsr publish
