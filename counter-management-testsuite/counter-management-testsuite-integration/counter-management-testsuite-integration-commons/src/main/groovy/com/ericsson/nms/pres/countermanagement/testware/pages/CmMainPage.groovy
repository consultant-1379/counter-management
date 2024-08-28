package com.ericsson.nms.pres.countermanagement.testware.pages

import com.ericsson.nms.pres.countermanagement.testware.fragments.CmTopFragment
import com.ericsson.nms.pres.countermanagement.testware.fragments.CmActionBarFragment
import com.ericsson.nms.pres.countermanagement.testware.fragments.CmTableFragment
import com.ericsson.nms.pres.countermanagement.testware.fragments.CmDetailsFragment
import com.ericsson.nms.pres.countermanagement.testware.fragments.CmErrorFragment

import groovy.util.logging.Slf4j
import org.jboss.arquillian.drone.api.annotation.Drone
import org.jboss.arquillian.graphene.Graphene
import org.jboss.arquillian.graphene.page.Location
import org.jboss.arquillian.graphene.page.Page
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement

import static org.jboss.arquillian.graphene.Graphene.guardAjax
import static com.ericsson.nms.pres.countermanagement.testware.LocalConstants.DEFAULT_DIMENSION
import static com.ericsson.nms.pres.countermanagement.testware.LocalConstants.CREATE_APP_TITLE as CTREATE_EBS_FLEX_COUNTER
import static com.ericsson.nms.pres.countermanagement.testware.LocalConstants.DETAILS_TITLE as DETAILS

@Slf4j
@Location('/#countermanagement')
class CmMainPage {

    @Drone WebDriver browser

    @Page CmTopFragment topFragment

    @Page CmActionBarFragment actionBarFragment

    @Page CmTableFragment tableFragment

    @Page CmDetailsFragment detailsFragment

    @Page CmErrorFragment errorFragment

    void inlineMainErrorMessageContainsHeader(header) {
        assert errorFragment.getMainInlineHeaderTxt() == header
    }

    void inlineDetailsErrorMessageContainsHeader(header) {
        assert errorFragment.getDetailsInlineHeaderTxt() == header
    }

    void popupErrorMessageContainsHeader(header) {
        assert errorFragment.getPopupHeaderTxt() == header
    }

    def whenLandingPageIsOpenAndTheTitleIs(title) {
        openLandingPage()
        assert topFragment.title == title
    }

    def whenLandingPageIsOpenTheTitleIsAndTableIsVisible(title) {
        openLandingPage()
        assert topFragment.title == title
        assert tableFragment.isTableVisible().isDisplayed()
    }

    def whenClickOnCreateIsOpenCreatePage() {
        actionBarFragment.clickActionButton('Create')
        assert topFragment.title == CTREATE_EBS_FLEX_COUNTER
    }

    void sortByColumn(column) {
        tableFragment.sortByColumn(column)
    }

    void addFilterToTable(filter) {
        tableFragment.addFilterToTable(filter)
    }

    void isTableCountEqualTo(count) {
        assert tableFragment.getTableCount().toString() == count.toString()
    }

    void isCounterVisible(counter) {
        assert tableFragment.isCounterVisible(counter).isDisplayed()
    }

    void clearFilter() {
        tableFragment.clearFilter()
    }

    void selectCounter(counter) {
        tableFragment.selectCounter(counter)
    }

    void isSelectedCountEqualTo(count) {
        assert tableFragment.getSelectedCount().getText().toString() == ('Selected ' + count)
    }

    void isCounterSelected(counter) {
        assert tableFragment.isCounterSelected(counter)
    }

    void isCounterNotSelected(counter) {
        assert !tableFragment.isCounterSelected(counter)
    }

    /*
     *  ascOrDesc should either take the value 'asc' or 'desc' otherwise the test is useless
     *  byColumn should take one of the values visible in the switch statement below
     */
    void verifySorting(byColumn, ascOrDesc) {
        int startingPoint = -1
        WebElement[] tableCells = tableFragment.getTableCells()

        switch (byColumn) {
            case 'Name':
                startingPoint = 0
                break

            case 'MO Class':
                startingPoint = 2
                break

            case 'Created By':
                startingPoint = 3
                break

            case 'Last Modified':
                startingPoint = 4
                break
        }

        for(int i = startingPoint; i < tableCells.length; i += 5) {
            if (i + 5 < tableCells.length) {
                if (ascOrDesc == 'asc') {
                     assert tableCells[i].getText().compareTo(tableCells[i + 5].getText()) <= 0
                } else if (ascOrDesc == 'desc') {
                     assert tableCells[i].getText().compareTo(tableCells[i + 5].getText()) >= 0
                }
            }
        }
    }

    def multiSelect(counters, def key='CONTROL'){
        tableFragment.multiSelect(counters, key)
    }

    void clearSelected() {
        tableFragment.clearSelected()
    }

    void selectAllUsingCheckbox() {
        tableFragment.selectAllUsingCheckbox()
    }


    def theDetailPanelIs(status) {

        if(status == "Open") {
            status == detailsFragment.isDetailsPanelVisible()
        } else if(status == "Close") {
            status == detailsFragment.isDetailsPanelNotVisible()
        }
        return status
    }

    def theDetailPanelTitleIs(title) {
        detailsFragment.getTitle()
    }

    def clickOnInformationIcon() {
        actionBarFragment.clickActionIcon(DETAILS)
    }

    def isDetailsPanelEmpty() {
        detailsFragment.isDetailsPanelEmpty()
    }

    def getFlexCounterName(flexCounterName) {
        detailsFragment.getName()
    }

    private void openLandingPage() {
        guardAjax(Graphene.goTo(this.class))
        browser.manage().window().setSize(DEFAULT_DIMENSION)
        log.info("Size of the window is ${browser.manage().window().getSize()}")
        browser.navigate().refresh()
    }


}
