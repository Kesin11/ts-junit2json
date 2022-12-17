VERSION --use-cache-command 0.6

FROM node:18.12.1
WORKDIR /build

build:
  COPY package.json package-lock.json .
  CACHE /root/.npm
  RUN npm ci

  COPY --dir src tsconfig.json .
  RUN npm run build
  SAVE ARTIFACT dist/ dist

publish:
  RUN --no-cache --secret GITHUB_TOKEN \
      git clone --depth=1 --branch=master https://github.com/Kesin11/ts-junit2json.git && \
      git config --global user.name "github-actions" && \
      git config --global user.email "github-actions@github.com" && \
      git config --global url."https://x-access-token:${GITHUB_TOKEN}@github.com/".insteadOf "https://github.com/"
  WORKDIR ts-junit2json

  ARG --required VERSION
  COPY +build/dist dist/
  RUN --no-cache --secret NODE_AUTH_TOKEN \
      echo '//registry.npmjs.org/:_authToken=${NODE_AUTH_TOKEN}' > $HOME/.npmrc && \
      npm version $VERSION && \
      npm publish --tag=beta
  RUN --no-cache --secret GITHUB_TOKEN git push origin master
