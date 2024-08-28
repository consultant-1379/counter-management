package com.ericsson.nms.pres.countermanagement.testware.fragments

import org.jboss.arquillian.drone.api.annotation.Drone
import org.openqa.selenium.By
import org.openqa.selenium.WebDriver

import static com.ericsson.nms.pres.countermanagement.testware.utils.WaitWrapper.waitForElementToBeVisible as isVisible
import static com.ericsson.nms.pres.countermanagement.testware.LocalConstants.XPathAttributes.*
import static com.ericsson.nms.pres.countermanagement.testware.LocalConstants.XPathElements.*
import static com.ericsson.nms.pres.countermanagement.testware.LocalConstants.XPathOthers.*

class CmErrorFragment {
    @Drone
    WebDriver browser

    def getMainInlineHeaderTxt() {
        isVisible(By.xpath(DIV + CLASS_EQ + 'eaCounterManagement-wViewContainer' +
                CLOSE_SHORT + DIV + CLASS_EQ + 'ebInlineMessage-header' + CLOSE_SHORT), browser).getText()
    }

    def getDetailsInlineHeaderTxt() {
        isVisible(By.xpath(DIV + CLASS_EQ + 'eaCounterManagement-rDetails-messageArea' +
                CLOSE_SHORT + DIV + CLASS_EQ + 'ebInlineMessage-header' + CLOSE_SHORT), browser).getText()
    }

    def getPopupHeaderTxt() {
        isVisible(By.xpath(DIV + CLASS_EQ + 'ebDialogBox-contentBlock ebDialogBox-contentBlock_type_error' +
                CLOSE_SHORT + DIV + CLASS_EQ + 'ebDialogBox-primaryText' + CLOSE_SHORT), browser).getText()
    }
}