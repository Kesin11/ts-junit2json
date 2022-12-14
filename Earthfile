VERSION --use-cache-command 0.6

# TypeScript build
FROM node:18.12.1
WORKDIR /build

build:
  COPY package.json package-lock.json .
  CACHE /root/.npm
  RUN npm ci

  COPY --dir src tsconfig.json .
  RUN npm run build

publish:
  FROM +build
  COPY --dir . .
  RUN git config user.name "github-actions" && \
      git config user.email "github-actions@github.com"
  RUN git restore .
  RUN --no-cache --secret NODE_AUTH_TOKEN \
      echo '//registry.npmjs.org/:_authToken=${NODE_AUTH_TOKEN}' > $HOME/.npmrc && \
      npm version prerelease && \
      npm publish --tag=beta
  # RUN git push
