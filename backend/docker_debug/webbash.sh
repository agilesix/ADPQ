#! /bin/bash

#change grep to the image name
docker exec -it $(docker ps | grep web | ruby -ne 'puts $_.split.first') bash
