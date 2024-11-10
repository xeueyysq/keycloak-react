#!/bin/bash

export $(cat .env.production | xargs)

export KC_COMMAND=start
export KC_PROXY=edge
export KC_HOSTNAME_STRICT=false
export KC_HOSTNAME_STRICT_HTTPS=false

docker-compose up -d --build 