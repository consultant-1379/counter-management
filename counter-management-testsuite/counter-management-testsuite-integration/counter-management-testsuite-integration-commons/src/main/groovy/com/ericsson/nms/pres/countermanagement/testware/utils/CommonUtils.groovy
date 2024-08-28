package com.ericsson.nms.pres.countermanagement.testware.utils

import org.jboss.arquillian.graphene.Graphene
import org.openqa.selenium.Keys
import org.openqa.selenium.WebDriver
import org.openqa.selenium.interactions.Actions




static pressCtrl(final WebDriver browser) {
    final Actions actions = new Actions(browser)
    actions.keyDown(Keys.CONTROL).perform()
}

static releaseCtrl(final WebDriver browser) {
    final Actions actions = new Actions(browser)
    actions.keyUp(Keys.CONTROL).perform()
}

static pressShift(final WebDriver browser) {
    final Actions actions = new Actions(browser)
    actions.keyDown(Keys.LEFT_SHIFT).perform()
}

static releaseShift(final WebDriver browser) {
    final Actions actions = new Actions(browser)
    actions.keyUp(Keys.LEFT_SHIFT).perform()
}

static sendRequest(url) {
    Graphene.guardNoRequest(((HttpURLConnection) new URL("http://localhost:8585/$url").openConnection()).getResponseCode())
}
