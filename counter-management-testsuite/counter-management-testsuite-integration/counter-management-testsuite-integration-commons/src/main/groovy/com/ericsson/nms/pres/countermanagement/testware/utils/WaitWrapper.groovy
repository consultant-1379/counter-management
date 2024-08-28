package com.ericsson.nms.pres.countermanagement.testware.utils


import org.jboss.arquillian.graphene.Graphene
import org.openqa.selenium.By
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement

import static TakeScreenShot.takeScreenShot

/**
 * The method will wait certain amount of time for a WebElement to be VISIBLE and then return the desired WebElement
 *
 * @param WebElement or instance of By
 * @param browser WebDriver
 * @return WebElement
 */
static waitForElementToBeVisible(element, WebDriver browser) {
    callWithErrorHandling({
        Graphene.waitGui(browser).until().element(element).is().visible()
    }, element, browser)
}

/**
 * The method will wait certain amount of time for a WebElement to be PRESENT and then return the desired WebElement
 *
 * @param element WebElement or instance of By
 * @param browser WebDriver
 * @return WebElement
 */
static waitForElementToBePresent(element, WebDriver browser) {
    callWithErrorHandling({
        Graphene.waitGui(browser).until().element(element).is().present()
    }, element, browser)
}

/**
 * The method will wait certain amount of time for a WebElement to be NOT VISIBLE and then return boolean True
 *
 * @param element WebElement or instance of By
 * @param browser WebDriver
 * @return Boolean
 */
static waitForElementNotToBeVisible(element, WebDriver browser) {
    callWithErrorHandling({
        Graphene.waitGui(browser).until().element(element).is().not().visible()
    }, element, browser)
}

/**
 * The method will wait certain amount of time for a WebElement to be CLICKABLE and then rreturn the desired WebElement
 *
 * @param element WebElement or instance of By
 * @param browser WebDriver
 * @return WebElement
 */
static waitForElementToBeClickable(element, WebDriver browser) {
    callWithErrorHandling({
        Graphene.waitGui(browser).until().element(element).is().clickable()
    }, element, browser)
}
/**
 * The method will wait certain amount of time for a WebElement to be NOT PRESENT and then return boolean True
 *
 * @param element WebElement or instance of By
 * @param browser WebDriver
 * @return Boolean
 */
static waitForElementNotToBePresent(element, WebDriver browser) {
    callWithErrorHandling({
        Graphene.waitGui(browser).until().element(element).is().not().present()
    }, element, browser)
}

static WebElement[] waitForOneElementToBeVisibleThenGetMultiple(element, WebDriver browser) {
    if(waitForElementToBeVisible(element, browser).isDisplayed()) {
        browser.findElements(element)
    }
}

static callWithErrorHandling(closure, element, WebDriver browser) {
    try {
        closure.call() //Execute the closure
        element instanceof By ? browser.findElement(element) : element
    } catch (exception) {
        takeScreenShot(Thread.currentThread().getStackTrace()[4].getMethodName(), browser)
        throw exception
    }
}

