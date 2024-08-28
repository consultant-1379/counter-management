package com.ericsson.nms.pres.countermanagement.testware.fragments

import org.jboss.arquillian.drone.api.annotation.Drone
import org.jboss.arquillian.graphene.page.Location
import org.openqa.selenium.By
import org.openqa.selenium.Keys
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.interactions.Actions
import org.openqa.selenium.support.FindBy

import static com.ericsson.nms.pres.countermanagement.testware.LocalConstants.XPathElements.*
import static com.ericsson.nms.pres.countermanagement.testware.LocalConstants.XPathAttributes.*
import static com.ericsson.nms.pres.countermanagement.testware.LocalConstants.XPathOthers.*
import static com.ericsson.nms.pres.countermanagement.testware.LocalConstants.XPathRelatives.*
import static com.ericsson.nms.pres.countermanagement.testware.utils.WaitWrapper.waitForElementToBeVisible as isVisible
import static com.ericsson.nms.pres.countermanagement.testware.utils.WaitWrapper.waitForOneElementToBeVisibleThenGetMultiple as multipleVisible

@Location('#countermanagement')
class CmTableFragment {
    @Drone
    WebDriver browser

    @FindBy(className = 'eaCounterManagement-counterTable')
    WebElement counterTable

    @FindBy(className = 'eaCounterManagement-counterTable-filter-input')
    WebElement filterInputArea

    @FindBy(className = 'eaCounterManagement-counterTable-count')
    WebElement tableCount

    @FindBy(className = 'eaCounterManagement-counterTable-select-count')
    WebElement selectedCount

    @FindBy(className = 'elTablelib-CheckboxHeaderCell')
    WebElement selectAllCheckbox

    final columnHeaderText = 'ebTable-headerText'
    final tableCell = 'ebTableCell'
    final clearFilter = 'eaCounterManagement-counterTable-filterClear ebColor_textLinkBlue'
    final tableRow = 'ebTableRow'
    final clearSelection = 'eaCounterManagement-counterTable-select-clear'

    def isTableVisible() {
        isVisible(counterTable, browser)
    }

    void sortByColumn(column) {
        isVisible(By.xpath(SPAN + CLASS_EQ + columnHeaderText + AND + TEXT_EQ + column + CLOSE_SHORT), browser).click()
    }

    void addFilterToTable(filter) {
        isVisible(filterInputArea, browser).sendKeys(filter.toString())
    }

    def getTableCount() {
        isVisible(tableCount, browser).getText()
    }

    def isCounterVisible(counter) {
        isVisible(By.xpath(TD + CLASS_EQ + tableCell + AND + TEXT_EQ + counter + CLOSE_SHORT), browser)
    }

    void clearFilter() {
        isVisible(By.xpath(SPAN + CLASS_EQ + clearFilter + CLOSE_SHORT), browser).click()
    }

    void selectCounter(counter) {
        isCounterVisible(counter).click()
    }

    def getSelectedCount() {
        isVisible(selectedCount, browser)
    }

    def isCounterSelected(counter) {
        isVisible(By.xpath(TD + CLASS_EQ + tableCell + AND + TEXT_EQ + counter + CLOSE_SHORT + '/..'), browser).getAttribute('class').contains('highlighted')
    }

    def getTableCells() {
        multipleVisible(By.xpath(ROW + CLASS_EQ + tableRow + CLOSE_SHORT + CHILD + TD_SHORT + CLASS_EQ + tableCell +  CLOSE_SHORT), browser)
    }

    void multiSelect(counters, keyName) {
        Actions builder = new Actions(browser)

        for(String counter : counters) {
            builder.keyDown(Keys[keyName]).click(isCounterVisible(counter)).keyUp(Keys[keyName]).perform()
        }
    }

    void clearSelected() {
        isVisible(By.xpath(SPAN + CONTAINS + CLASS + clearSelection + CLOSE), browser).click()
    }

    void selectAllUsingCheckbox() {
        isVisible(selectAllCheckbox, browser).click()
    }
}
