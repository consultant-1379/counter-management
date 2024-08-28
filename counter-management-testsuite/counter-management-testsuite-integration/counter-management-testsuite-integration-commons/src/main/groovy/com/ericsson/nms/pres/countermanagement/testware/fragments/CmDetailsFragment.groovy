package com.ericsson.nms.pres.countermanagement.testware.fragments

import org.jboss.arquillian.drone.api.annotation.Drone
import org.jboss.arquillian.graphene.page.Location
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.FindBy
import org.openqa.selenium.By


import static com.ericsson.nms.pres.countermanagement.testware.utils.WaitWrapper.waitForElementToBeVisible as isVisible
import static com.ericsson.nms.pres.countermanagement.testware.utils.WaitWrapper.waitForElementNotToBeVisible as isNotVisible
import static com.ericsson.nms.pres.countermanagement.testware.LocalConstants.XPathElements.DIV
import static com.ericsson.nms.pres.countermanagement.testware.LocalConstants.XPathOthers.CONTAINS
import static com.ericsson.nms.pres.countermanagement.testware.LocalConstants.XPathOthers.CLOSE
import static com.ericsson.nms.pres.countermanagement.testware.LocalConstants.XPathAttributes.TEXT




@Location('')
class CmDetailsFragment {
    @Drone
    WebDriver browser

    @FindBy(css = ".elLayouts-MultiSlidingPanels-right")
    private WebElement root

    @FindBy(className = 'elLayouts-MultiSlidingPanels-title-right')
    WebElement title

    @FindBy(className = 'eaCounterManagement-wCounterDetails-attributeValue')
    WebElement attributeValue


    def getTitle() {
        isVisible(title, browser).getText()
    }

    def isDetailsPanelVisible() {
        isVisible(root, browser)
    }

    def isDetailsPanelNotVisible() {
        isNotVisible(root, browser)
    }

    def isDetailsPanelEmpty() {
        isVisible(By.xpath(DIV + CONTAINS + TEXT + "No EBS Flex Counters Selected" + CLOSE), browser)
    }

    def getName() {
        isVisible(attributeValue, browser).getText()
    }
}
