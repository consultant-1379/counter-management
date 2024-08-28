package com.ericsson.nms.pres.countermanagement.testware.fragments

import org.jboss.arquillian.drone.api.annotation.Drone
import org.jboss.arquillian.graphene.page.Location
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.FindBy

import static com.ericsson.nms.pres.countermanagement.testware.utils.WaitWrapper.waitForElementToBeVisible as isVisible

@Location('')
class CmTopFragment {
    @Drone
    WebDriver browser

    @FindBy(className = 'elLayouts-TopSection-title')
    WebElement title

    def getTitle() {
        isVisible(title, browser).getText()
    }
}