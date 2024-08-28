package com.ericsson.nms.pres.countermanagement.testware.fragments

import org.jboss.arquillian.drone.api.annotation.Drone
import org.jboss.arquillian.graphene.page.Location
import org.openqa.selenium.TimeoutException
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.interactions.Actions
import org.openqa.selenium.support.FindBy

import static com.ericsson.nms.pres.countermanagement.testware.utils.TakeScreenShot.takeScreenShot
import static com.ericsson.nms.pres.countermanagement.testware.utils.WaitWrapper.waitForElementNotToBeVisible
import static com.ericsson.nms.pres.countermanagement.testware.utils.WaitWrapper.waitForElementToBePresent
import static com.ericsson.nms.pres.countermanagement.testware.utils.WaitWrapper.waitForElementToBeVisible
import static com.ericsson.nms.pres.countermanagement.testware.LocalConstants.XPathElements.DIV
import static com.ericsson.nms.pres.countermanagement.testware.LocalConstants.XPathElements.SPAN
import static com.ericsson.nms.pres.countermanagement.testware.LocalConstants.XPathOthers.CONTAINS
import static com.ericsson.nms.pres.countermanagement.testware.LocalConstants.XPathAttributes.TEXT
import static com.ericsson.nms.pres.countermanagement.testware.LocalConstants.XPathAttributes.CLASS
import static com.ericsson.nms.pres.countermanagement.testware.LocalConstants.XPathAttributes.CLASS_EQ
import static com.ericsson.nms.pres.countermanagement.testware.LocalConstants.XPathOthers.CLOSE
import static com.ericsson.nms.pres.countermanagement.testware.LocalConstants.XPathOthers.CLOSE_SHORT
import static com.ericsson.nms.pres.countermanagement.testware.LocalConstants.XPathRelatives.PARENT_ALL

import static org.openqa.selenium.By.xpath

@Location('')
class CmNodeTypeSelectFragment {
    @Drone
    WebDriver browser

    @FindBy(className = 'eaCounterManagement-wNodeTypeSelect')
    WebElement nodeTypeSelect

    @FindBy(className = 'eaCounterManagement-wNodeTypeSelect-nodeTypeSelect')
    WebElement dropDown

    @FindBy(className = 'ebComponentList-items')
    private WebElement listOfItems

    def isDropDownVisible() {
        return waitForElementToBeVisible(dropDown, browser).isDisplayed()
    }

    def expandDropDown() {
        boolean isNotExpanded = false
        try {
            try {
                isNotExpanded = waitForElementNotToBeVisible(listOfItems, browser)
            } catch (final TimeoutException | NoSuchElementException ignored) {
            }

            if (isDropDownVisible() && isNotExpanded) {
                dropDown.click()
            }
        } catch (final NoSuchElementException elementNotFoundException) {
            takeScreenShot("expandDropdown", browser)
            throw elementNotFoundException
        }
    }

    def getDropdownItemByName(title) {
        return waitForElementToBePresent(xpath(DIV + CONTAINS + CLASS + listOfItems.getAttribute("class") + CLOSE
                + DIV + CONTAINS + TEXT + title + CLOSE + PARENT_ALL), browser)
    }

    def selectByName(title) {
        getDropdownItemByName(title).click()
    }

    def checkDropDownItemIsVisible(title) {
        return getDropdownItemByName(title).isDisplayed()
    }

    def checkSelectableByName(title) {
        final WebElement dropDownItem = this.getDropdownItemByName(title)
        final Actions actions = new Actions(browser)
        actions.moveToElement(dropDownItem)
        actions.build().perform()
        return dropDownItem.getAttribute("class").contains("ebComponentList-item_focused")
    }

    def getDropDownItemValue() {
        return waitForElementToBePresent(xpath(SPAN + CLASS_EQ + 'ebSelect-value' + CLOSE_SHORT), browser).getText()
    }
}