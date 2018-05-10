FROM node:8
# FROM ubuntu:18.04

RUN apt-get update \
 && apt-get install -y gconf-service build-essential ca-certificates fonts-liberation libappindicator1 libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libssl-dev libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release nodejs npm wget xdg-utils \
 && apt-get autoclean \
 && apt-get autoremove

RUN mkdir /app
RUN useradd chi --create-home && chown chi:chi /app

WORKDIR /app
USER chi

COPY --chown=chi:chi .npmrc package.json package-lock.json ./

RUN npm install

COPY --chown=chi:chi . .
