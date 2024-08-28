#!/bin/bash
PROFILES="local_ui"

while [ "$1" != "" ]; do

    if [ "$1" == test ]; then
        PROFILES="${PROFILES},local,integration-tests,test-compile"
    fi

    if [ "$1" == skip_ui ]; then
        cd counter-management-testsuite
    fi

    shift
done

mvn clean install test -P$PROFILES
