#!/bin/sh

set -eo pipefail

[ $# -eq 0 ] && {
    npm start
    exit
}

exec "$@"
