FROM ubuntu:18.04

ENV BABEL_DISABLE_CACHE=1
# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Install Dependencies
RUN apt-get update \
 && apt-get install -y gconf-service build-essential ca-certificates fonts-liberation libappindicator1 libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libssl-dev libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release nodejs npm wget xdg-utils \
 && apt-get autoclean \
 && apt-get autoremove

# TODO: Add Node from NodeSource

# Install Google Chrome (only used by Chromy, not Puppeteer)
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt install -y ./google-chrome-stable_current_amd64.deb

# Setup the Chi Application Environment
RUN mkdir /app
WORKDIR /app

# Add User (Chi)
RUN useradd chi --create-home --groups sudo && chown chi:chi /app
USER chi

# Install Project Dependencies
COPY --chown=chi:chi .npmrc package.json package-lock.json ./
RUN npm install --ignore-scripts
COPY --chown=chi:chi . .
