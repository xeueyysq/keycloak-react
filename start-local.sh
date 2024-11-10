#!/bin/bash

export $(cat .env.local | xargs)

export KC_COMMAND=start-dev
export KC_PROXY=edge
export KC_HOSTNAME_STRICT=false
export KC_HOSTNAME_STRICT_HTTPS=false

docker-compose up -d --build 