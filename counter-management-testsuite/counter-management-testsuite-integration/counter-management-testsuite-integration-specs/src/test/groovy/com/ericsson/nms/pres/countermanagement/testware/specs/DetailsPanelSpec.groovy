package com.ericsson.nms.pres.countermanagement.testware.specs


import org.jboss.arquillian.graphene.page.Page
import org.jboss.arquillian.spock.ArquillianSputnik
import org.junit.runner.RunWith
import spock.lang.Specification

import com.ericsson.nms.pres.countermanagement.testware.pages.CmMainPage as LandingPage
import static com.ericsson.nms.pres.countermanagement.testware.LocalConstants.DETAILS_TITLE as DETAILS
import static com.ericsson.nms.pres.countermanagement.testware.LocalConstants.OPEN as Open
import static com.ericsson.nms.pres.countermanagement.testware.LocalConstants.CLOSE as Close
import static com.ericsson.nms.pres.countermanagement.testware.LocalConstants.APP_TITLE as COUNTER_MANAGEMENT


@RunWith(ArquillianSputnik)
class DetailsPanelSpec extends Specification {
    @Page LandingPage landingPage

    final FLEX_COUNTER1 = 'pmFlexRwrFailNoEutranTarget_UeCat2-100UePwrClass0|1'
    final FLEX_COUNTER2 = 'pmFlexCuUpExampleCounter_Spid4SNssai4-7QoS1-9'
    final FLEX_COUNTER3 = 'pmFlexRwrFailPlmnNotAllowed_UeCat100|103|190UePwrClass0|1|4'

    def 'Check if the Details Panel is closed by Default'() {
        when: 'Open the landing page and make sure title is Counter Management'
        landingPage.whenLandingPageIsOpenTheTitleIsAndTableIsVisible(COUNTER_MANAGEMENT)

        then: 'Details panel is closed by default'
        landingPage.theDetailPanelIs(Close)
    }


    def 'Check the title of Details Panel when you click the information icon'() {
        given: 'Open the landing page and make sure title is Counter Management'
        landingPage.whenLandingPageIsOpenTheTitleIsAndTableIsVisible(COUNTER_MANAGEMENT)

        when: 'Open Details Panel'
        landingPage.clickOnInformationIcon()

        and: 'The Details panel is open'
        landingPage.theDetailPanelIs(Open)

        then: 'Check the title of details panel'
        landingPage.theDetailPanelTitleIs(DETAILS)
    }



    def 'Check the default message of the Details Panel when no counters are selected'() {
        given: 'Open the landing page and make sure title is Counter Management'
        landingPage.whenLandingPageIsOpenTheTitleIsAndTableIsVisible(COUNTER_MANAGEMENT)

        when: 'Open Details Panel'
        landingPage.clickOnInformationIcon()

        and: 'The Details panel is open'
        landingPage.theDetailPanelIs(Open)

        then: 'Check if it is empty'
        landingPage.isDetailsPanelEmpty()
    }

    def 'Check the details panel is showing the details of  the selected counter'() {
        given: 'Open the landing page and make sure title is Counter Management'
        landingPage.whenLandingPageIsOpenTheTitleIsAndTableIsVisible(COUNTER_MANAGEMENT)

        when: 'Open Details Panel'
        landingPage.clickOnInformationIcon()

        and: 'The Details panel is open'
        landingPage.theDetailPanelIs(Open)

        and: 'Click the flex counter to see the details'
        landingPage.selectCounter(FLEX_COUNTER1)

        then: 'Check if the details of the selected counter is shown'
        landingPage.getFlexCounterName() == FLEX_COUNTER1
    }

    def 'Check the details panel is showing the values of selected counter when the selection is made when it is closed'() {
        given: 'Open the landing page and make sure title is Counter Management'
        landingPage.whenLandingPageIsOpenTheTitleIsAndTableIsVisible(COUNTER_MANAGEMENT)

        when: 'The Details panel is closed'
        landingPage.theDetailPanelIs(Close)

        and: 'Select the flex counter'
        landingPage.selectCounter(FLEX_COUNTER1)

        and: 'Click on information icon to open details panel'
        landingPage.clickOnInformationIcon()

        and: 'The Details panel is open'
        landingPage.theDetailPanelIs(Open)

        then: 'Check if the details of the selected counter is shown'
        landingPage.getFlexCounterName() == FLEX_COUNTER1
    }

    def 'Check the details panel is empty when some counter is selected and unselected back'() {
        given: 'Open the landing page and make sure title is Counter Management'
        landingPage.whenLandingPageIsOpenTheTitleIsAndTableIsVisible(COUNTER_MANAGEMENT)

        when: 'The Details panel is closed'
        landingPage.theDetailPanelIs(Close)

        and: 'Click on information icon to open details panel'
        landingPage.clickOnInformationIcon()

        and: 'The Details panel is open'
        landingPage.theDetailPanelIs(Open)

        and: 'Click the flex counter to see the details'
        landingPage.selectCounter(FLEX_COUNTER1)

        and: 'Click the flex counter again to unselect it'
        landingPage.selectCounter(FLEX_COUNTER1)

        then: 'Check if it is empty'
        landingPage.isDetailsPanelEmpty()
    }

    def 'Check the last selected counter details are shown when multiple counters are selected using CTRL key'() {
        given: 'Open the landing page and make sure title is Counter Management'
        landingPage.whenLandingPageIsOpenTheTitleIsAndTableIsVisible(COUNTER_MANAGEMENT)

        when: 'The Details panel is closed'
        landingPage.theDetailPanelIs(Close)

        and: 'Click on information icon to open details panel'
        landingPage.clickOnInformationIcon()

        and: 'The Details panel is open'
        landingPage.theDetailPanelIs(Open)

        and: 'Click the flex counter to see the details'
        landingPage.multiSelect([FLEX_COUNTER2, FLEX_COUNTER3, FLEX_COUNTER1])

        then: 'Check the details of the last selected counter is shown'
        landingPage.getFlexCounterName() == FLEX_COUNTER1
    }

    def 'Check the second last selected item details are shown when multiple counters are selected using CTRL and the last selected counter was deselected'() {
        given: 'Open the landing page and make sure title is Counter Management'
        landingPage.whenLandingPageIsOpenTheTitleIsAndTableIsVisible(COUNTER_MANAGEMENT)

        when: 'The Details panel is closed'
        landingPage.theDetailPanelIs(Close)

        and: 'Click on information icon to open details panel'
        landingPage.clickOnInformationIcon()

        and: 'The Details panel is open'
        landingPage.theDetailPanelIs(Open)

        and: 'Ctrl Click the flex counters and Click the last flex counter again to deselect it'
        landingPage.multiSelect([FLEX_COUNTER1, FLEX_COUNTER2, FLEX_COUNTER3, FLEX_COUNTER3])

        then: 'Check if the details of the counter which is selected previous to last selection is shown'
        landingPage.getFlexCounterName() == FLEX_COUNTER2

    }

    def 'Check the correct item details are shown when multiple counters are selected using CTRL and selected counter was deselected in different order'() {
        given: 'Open the landing page and make sure title is Counter Management'
        landingPage.whenLandingPageIsOpenTheTitleIsAndTableIsVisible(COUNTER_MANAGEMENT)

        when: 'The Details panel is closed'
        landingPage.theDetailPanelIs(Close)

        and: 'Click on information icon to open details panel'
        landingPage.clickOnInformationIcon()

        and: 'The Details panel is open'
        landingPage.theDetailPanelIs(Open)

        and: 'Ctrl Click the flex counters and Click the last flex counter again to deselect it'
        landingPage.multiSelect([FLEX_COUNTER1, FLEX_COUNTER2, FLEX_COUNTER3, FLEX_COUNTER2, FLEX_COUNTER3])

        then: 'Check if the details of the counter which is selected previous to last selection is shown'
        landingPage.getFlexCounterName() == FLEX_COUNTER1
    }

    def 'Check the last selected item details are shown when multiple counters are selected using SHIFT'() {
        given: 'Open the landing page and make sure title is Counter Management'
        landingPage.whenLandingPageIsOpenTheTitleIsAndTableIsVisible(COUNTER_MANAGEMENT)

        when: 'The Details panel is closed'
        landingPage.theDetailPanelIs(Close)

        and: 'Click on information icon to open details panel'
        landingPage.clickOnInformationIcon()

        and: 'The Details panel is open'
        landingPage.theDetailPanelIs(Open)

        and: 'Click the flex counter to see the details'
        landingPage.multiSelect([FLEX_COUNTER1, FLEX_COUNTER3], 'SHIFT')

        then: 'Check if the details of the last selected counter is shown'
        landingPage.getFlexCounterName() == FLEX_COUNTER3
    }

    def 'Check the last selected item details are shown when multiple counters are selected using SHIFT from the bottom to top'() {
        given: 'Open the landing page and make sure title is Counter Management'
        landingPage.whenLandingPageIsOpenTheTitleIsAndTableIsVisible(COUNTER_MANAGEMENT)

        when: 'The Details panel is closed'
        landingPage.theDetailPanelIs(Close)

        and: 'Click on information icon to open details panel'
        landingPage.clickOnInformationIcon()

        and: 'The Details panel is open'
        landingPage.theDetailPanelIs(Open)

        and: 'Click the flex counter to see the details'
        landingPage.multiSelect([FLEX_COUNTER3, FLEX_COUNTER1], 'SHIFT')

        then: 'Check if the details of the last selected counter is shown'
        landingPage.getFlexCounterName() == FLEX_COUNTER1
    }

    def 'Check if there is no change in details panel when multiple counters are selected using CTRL and some counter is deselected from the middle of selection'() {
        given: 'Open the landing page and make sure title is Counter Management'
        landingPage.whenLandingPageIsOpenTheTitleIsAndTableIsVisible(COUNTER_MANAGEMENT)

        when: 'The Details panel is closed'
        landingPage.theDetailPanelIs(Close)

        and: 'Click on information icon to open details panel'
        landingPage.clickOnInformationIcon()

        and: 'The Details panel is open'
        landingPage.theDetailPanelIs(Open)

        and: 'Ctrl Click the flex counters and Click one flex counter other than the last selected counter again to deselect it'
        landingPage.multiSelect([FLEX_COUNTER1, FLEX_COUNTER2, FLEX_COUNTER3, FLEX_COUNTER2])

        then: 'Check if the details remains unchanged'
        landingPage.getFlexCounterName() == FLEX_COUNTER3

    }

    def 'Check if there is no change in details panel when select all is done'() {
        given: 'Open the landing page and make sure title is Counter Management'
        landingPage.whenLandingPageIsOpenTheTitleIsAndTableIsVisible(COUNTER_MANAGEMENT)

        when: 'The Details panel is closed'
        landingPage.theDetailPanelIs(Close)

        and: 'Click on information icon to open details panel'
        landingPage.clickOnInformationIcon()

        and: 'The Details panel is open'
        landingPage.theDetailPanelIs(Open)

        and: 'Select all flex counters'
        landingPage.selectAllUsingCheckbox()

        then: 'Check if the details remains unchanged'
        landingPage.isDetailsPanelEmpty()
    }

}
