FROM jenkins/jenkins:lts-jdk17
USER root
RUN apt-get update && apt-get install -y lsb-release
RUN curl -fsSLo /usr/share/keyrings/docker-archive-keyring.asc \
  https://download.docker.com/linux/debian/gpg
RUN echo "deb [arch=$(dpkg --print-architecture) \
  signed-by=/usr/share/keyrings/docker-archive-keyring.asc] \
  https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list
RUN apt-get update && apt-get install -y docker-ce-cli
RUN apt-get install -y apt-transport-https ca-certificates curl sudo gnupg2 software-propereis-common
RUN apt-get install -y nodejs
RUN apt-get install -y python3-pip
RUN apt install awscli -y
RUN pip3 install --upgrade awscli
RUN adduser jenkins sudo
RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers
USER jenkins
RUN jenkins-plugin-cli --plugins "blueocean:1.27.7 docker-workflow:572.v950f58993843"
