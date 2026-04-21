#!/usr/bin/env bash
# env-probe.sh — read-only environment probe for the /sprint-plan skill.
#
# Purpose: tell Claude which dev/testing capabilities are available so it can
# pick the right workflow (container → host-docker → limited).
#
# Does NOT modify anything. Safe to run repeatedly. Outputs key=value lines
# on stdout so Claude can parse it deterministically.

set -u

mode="unknown"
in_container="no"
host_docker="no"
compose_file="no"
compose_cmd=""
cwd_writable="no"
ruby_present="no"
bundler_present="no"
dns_ok="no"

if [ -f /.dockerenv ]; then
  in_container="yes"
fi
if [ -r /proc/1/cgroup ] && grep -qE '(docker|containerd|kubepods|podman)' /proc/1/cgroup 2>/dev/null; then
  in_container="yes"
fi

if [ "$in_container" = "yes" ]; then
  mode="container"
fi

if command -v docker >/dev/null 2>&1; then
  if docker info >/dev/null 2>&1; then
    host_docker="yes"
    if [ "$mode" = "unknown" ]; then
      mode="host-docker"
    fi
  fi
fi

if command -v docker-compose >/dev/null 2>&1; then
  compose_cmd="docker-compose"
elif docker compose version >/dev/null 2>&1; then
  compose_cmd="docker compose"
fi

if [ -f docker-compose.yml ] || [ -f docker-compose.yaml ] || [ -f compose.yml ] || [ -f compose.yaml ]; then
  compose_file="yes"
fi

if [ -w . ]; then
  cwd_writable="yes"
fi

if command -v ruby >/dev/null 2>&1; then
  ruby_present="yes"
fi
if command -v bundle >/dev/null 2>&1; then
  bundler_present="yes"
fi

if command -v getent >/dev/null 2>&1 && getent hosts github.com >/dev/null 2>&1; then
  dns_ok="yes"
fi

if [ "$mode" = "unknown" ]; then
  mode="limited"
fi

printf 'mode=%s\n' "$mode"
printf 'in_container=%s\n' "$in_container"
printf 'host_docker=%s\n' "$host_docker"
printf 'compose_cmd=%s\n' "$compose_cmd"
printf 'compose_file=%s\n' "$compose_file"
printf 'cwd_writable=%s\n' "$cwd_writable"
printf 'ruby_present=%s\n' "$ruby_present"
printf 'bundler_present=%s\n' "$bundler_present"
printf 'dns_ok=%s\n' "$dns_ok"
