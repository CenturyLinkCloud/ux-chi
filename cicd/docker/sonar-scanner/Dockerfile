FROM cypress/browsers:node10.16.3-chrome80-ff73

LABEL Description="This is a base image, which provides a cypress environment"

ARG user=jenkins
ARG group=jenkins
ARG uid=1341
ARG gid=1341
RUN getent group ${gid} || groupadd -g ${gid} ${group}
RUN useradd -c "Jenkins user" -d /home/${user} -u ${uid} -g ${gid} -m ${user}

VOLUME /ux-chi

USER root

ENV QT_X11_NO_MITSHM=1
ENV _X11_NO_MITSHM=1
ENV _MITSHM=0
ENV TERM=xterm-256color

# ENV CYPRESS_CACHE_FOLDER=/tmp/.cache/Cypress
# RUN npm install -g "cypress@3.8.3" "typescript"

# RUN cypress verify

# RUN cypress cache path
# RUN cypress cache list
# RUN cypress -v

RUN ls -la /root
RUN chmod 755 /root

RUN apt-get -y update && \
    apt-get -y install jq yajl-tools default-jre

WORKDIR /home/node

RUN wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.3.0.2102-linux.zip && \
    unzip sonar-scanner-cli-4.3.0.2102-linux.zip

ENV PATH="/home/node/sonar-scanner-4.3.0.2102-linux/bin:${PATH}"
ENV JAVA_HOME="/usr/lib/jvm/java-8-openjdk-amd64/jre"

RUN echo -n | openssl s_client -connect sonar.foss.corp.intranet:443 </dev/null 2>/dev/null | sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p' > /home/node/sonar-scanner-4.3.0.2102-linux/sonar.crt

RUN openssl x509 -outform der -in /home/node/sonar-scanner-4.3.0.2102-linux/sonar.crt -out /home/node/sonar-scanner-4.3.0.2102-linux/sonar.der

RUN keytool -import -noprompt -alias ctl -storepass changeit -keystore /etc/ssl/certs/java/cacerts -file /home/node/sonar-scanner-4.3.0.2102-linux/sonar.der

ENV SONAR_SCANNER_OPTS="-Dcom.sun.net.ssl.checkRevocation=false -Djavax.net.ssl.trustStore=/etc/ssl/certs/java/cacerts -Djavax.net.ssl.keyStore=/etc/ssl/certs/java/cacerts"

RUN chmod -R 777 /home/node/sonar-scanner-4.3.0.2102-linux
RUN usermod -a -G staff node
RUN usermod -a -G staff ${user}