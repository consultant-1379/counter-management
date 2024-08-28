package com.ericsson.nms.pres.countermanagement.testware.fragments

import org.jboss.arquillian.drone.api.annotation.Drone
import org.jboss.arquillian.graphene.page.Location
import org.openqa.selenium.By
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.FindBy

import static com.ericsson.nms.pres.countermanagement.testware.utils.WaitWrapper.waitForElementToBePresent
import static com.ericsson.nms.pres.countermanagement.testware.utils.WaitWrapper.waitForElementToBeClickable

import static com.ericsson.nms.pres.countermanagement.testware.LocalConstants.XPathElements.BUTTON
import static com.ericsson.nms.pres.countermanagement.testware.LocalConstants.XPathOthers.CONTAINS
import static com.ericsson.nms.pres.countermanagement.testware.LocalConstants.XPathAttributes.TEXT
import static com.ericsson.nms.pres.countermanagement.testware.LocalConstants.XPathOthers.CLOSE


@Location('')
class CmActionBarFragment {
    @Drone
    WebDriver browser

    @FindBy(className = 'elLayouts-QuickActionBar')
    WebElement actionBar


    @FindBy(className = 'elLayouts-PanelActionBar-button_details')
    WebElement informationIcon


    def getActionButton(button) {
        return waitForElementToBePresent(By.xpath(BUTTON + CONTAINS + TEXT + button + CLOSE), browser)
    }


    def getActionIcon(iconName) {
        return waitForElementToBeClickable(By.xpath(SPAN + CONTAINS + TEXT + iconName + CLOSE), browser)
    }


    def clickActionButton(button) {
        return getActionButton(button).click()
    }


    def clickActionIcon(icon) {
        return informationIcon.click()
    }

}
