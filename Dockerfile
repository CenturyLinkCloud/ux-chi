FROM ubuntu:18.04
ENV BABEL_DISABLE_CACHE=1

RUN apt update
RUN apt install -y build-essential libssl-dev wget

# Install Node (on Ubuntu 18.04 this is Node 8 LTS)
RUN apt install -y nodejs npm

# Install Latest Chrome (from the Stable channel)
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt install -y ./google-chrome-stable_current_amd64.deb

RUN mkdir /app
WORKDIR /app

COPY .npmrc package.json ./
RUN npm install
COPY .babelrc .eslintrc.json .jshintrc .sass-lint.yml backstop-responsive.json backstop-non-responsive.json gulpfile.babel.js ./

RUN chmod a+rwx /app \
    && chmod a+rw /app/* \
    && chmod a+rw /app/.*
RUN mkdir /app/public \
    && chmod a+rwx /app/public
