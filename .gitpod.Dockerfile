FROM gitpod/workspace-base

RUN cd /workspace \
    && curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \
    && unzip awscliv2.zip \
    && sudo /workspace/aws/install

RUN sudo apt update \
    && sudo apt install npm -y \
    && curl -fsSL https://www.postgresql.org/media/keys/ACCC4CF8.asc|sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/postgresql.gpg \
    &&  echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" |sudo tee  /etc/apt/sources.list.d/pgdg.list \
    &&  sudo apt update \
    &&  sudo apt install -y postgresql-client-13 libpq-dev \
    && sudo apt install -y apt-utils --no-install-recommends apt-utils \
    && sudo add-apt-repository ppa:deadsnakes/ppa -y \
    && sudo apt update \
    && sudo apt install -y python3.11 
