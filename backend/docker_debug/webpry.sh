#! /bin/bash
docker exec -it $(docker ps | grep web | ruby -ne 'puts $_.split.first') pry-remote
