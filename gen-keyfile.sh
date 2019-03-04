#!/bin/bash

# https://docs.mongodb.com/manual/tutorial/enforce-keyfile-access-control-in-existing-replica-set/#create-a-keyfile

openssl rand -base64 756 > secret
chmod 400 secret
