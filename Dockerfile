FROM node:dubnium-stretch

ENV BABEL_DISABLE_CACHE=1

ARG user=jenkins
ARG group=jenkins
ARG uid=1341
ARG gid=1341
RUN getent group ${gid} || groupadd -g ${gid} ${group}
RUN useradd -c "Jenkins user" -d /home/${user} -u ${uid} -g ${gid} -m ${user}

USER root

# Add Tini
ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini

RUN mkdir -p /chi
WORKDIR /chi

RUN wget https://www.slimjet.com/chrome/download-chrome.php?file=files%2F71.0.3578.80%2Fgoogle-chrome-stable_current_amd64.deb -O google-chrome-stable_current_amd64.deb \
 && apt-get update \
 && apt-get install -y ./google-chrome-stable_current_amd64.deb expect libgconf-2-4 xvfb busybox \
 && apt-get clean \
 && rm ./google-chrome-stable_current_amd64.deb

RUN mkdir /tmp/{chi,custom-elements,chi-vue}
COPY package_chi.json /tmp/chi/package.json
COPY package_custom-elements.json /tmp/custom-elements/package.json
COPY package_vue.json /tmp/chi-vue/package.json

RUN  cd /tmp/chi \
 && yarn install \
 && cd /tmp/custom-elements \
 && yarn install \
 && cd /tmp/chi-vue \
 && yarn install \
 && yarn cache clean


COPY entrypoint.sh /
ENTRYPOINT ["/tini", "--", "/entrypoint.sh"]
