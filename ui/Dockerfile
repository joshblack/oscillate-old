FROM node:7.4.0

RUN mkdir -p /usr/src/oscillate-ui

WORKDIR /usr/src/oscillate-ui

# Setup yarn for faster, deterministic builds
RUN npm install -g yarn

COPY package.json .babelrc .eslintrc yarn.lock Makefile ./
COPY ci ./ci
COPY scripts ./scripts
COPY public ./public
COPY src ./src

RUN yarn install
RUN make build

# Specify the port for our Node.js server to listen on
ENV PORT 3000

CMD ["yarn", "start"]
