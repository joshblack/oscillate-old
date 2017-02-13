#!/bin/bash

set -e

headless_shell --no-sandbox --remote-debugging-port=9222 &>1 &

exec "$@"
