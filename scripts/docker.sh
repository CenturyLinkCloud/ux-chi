#!/usr/bin/env bash

docker build --tag chi:latest .

if [ -z "$1" ]; then
  docker run --rm --init --tty --interactive \
    --shm-size 512m \
    --volume $PWD/src:/app/src \
    --volume $PWD/test:/app/test \
    --volume $PWD/tasks:/app/tasks \
    --volume $PWD/scripts:/app/scripts \
    --volume $PWD/reports:/app/reports \
    --volume $PWD/config:/app/config \
    chi:latest
elif [ $1 = "start" ]; then
  docker run --rm --init --tty --interactive \
    --memory 1g \
    --shm-size 512m \
    --volume $PWD/src:/app/src \
    --volume $PWD/test:/app/test \
    --volume $PWD/tasks:/app/tasks \
    --volume $PWD/scripts:/app/scripts \
    --volume $PWD/reports:/app/reports \
    --volume $PWD/config:/app/config \
    --publish 8000:8000 \
    --publish 35729:35729 \
    chi:latest npm run $1
else
  docker run --rm --init --tty --interactive \
    --shm-size 512m \
    --volume $PWD/src:/app/src \
    --volume $PWD/test:/app/test \
    --volume $PWD/tasks:/app/tasks \
    --volume $PWD/scripts:/app/scripts \
    --volume $PWD/reports:/app/reports \
    --volume $PWD/config:/app/config \
    chi:latest npm run $1
fi
