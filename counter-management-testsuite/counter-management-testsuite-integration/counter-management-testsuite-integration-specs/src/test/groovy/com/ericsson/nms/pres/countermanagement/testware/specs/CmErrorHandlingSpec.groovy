package com.ericsson.nms.pres.countermanagement.testware.specs

import org.jboss.arquillian.graphene.page.Page
import org.jboss.arquillian.spock.ArquillianSputnik
import org.junit.runner.RunWith
import spock.lang.Specification

import com.ericsson.nms.pres.countermanagement.testware.pages.CmMainPage
import com.ericsson.nms.pres.countermanagement.testware.pages.CmCreateFlexCounterPage
import static com.ericsson.nms.pres.countermanagement.testware.LocalConstants.*
import static com.ericsson.nms.pres.countermanagement.testware.utils.CommonUtils.sendRequest

@RunWith(ArquillianSputnik)
class CmErrorHandlingSpec extends Specification {
    @Page CmMainPage landingPage
    @Page CmCreateFlexCounterPage createFlexCounter

    final FLEX_COUNTER1 = 'pmFlexRwrFailNoEutranTarget_UeCat2-100UePwrClass0|1'

    def 'Check if Counter Table has error handling on User Rights'() {
        setup: 'Set response to 403'
        sendRequest(MOCK_BLOCK_URL + 403)

        when: 'Open the landing page and make sure title is Counter Management'
        landingPage.whenLandingPageIsOpenAndTheTitleIs(APP_TITLE)

        then: 'Page displays error 403 message'
        landingPage.inlineMainErrorMessageContainsHeader(ERROR_403)

        cleanup: 'Reset response to default'
        sendRequest(MOCK_UNBLOCK_URL)
    }

    def 'Check if Counter Table has error handling on Unknown Error'() {
        setup: 'Set response to 409'
        sendRequest(MOCK_BLOCK_URL + 409)

        when: 'Open the landing page and make sure title is Counter Management'
        landingPage.whenLandingPageIsOpenAndTheTitleIs(APP_TITLE)

        then: 'Page displays the unknown error message'
        landingPage.inlineMainErrorMessageContainsHeader(ERROR_UNKNOWN)

        cleanup: 'Reset response to default'
        sendRequest(MOCK_UNBLOCK_URL)
    }

    def 'Check if Counter Table has error handling on Custom Internall Error'() {
        setup: 'Set response to 400'
        sendRequest(MOCK_BLOCK_URL + 400)

        when: 'Open the landing page and make sure title is Counter Management'
        landingPage.whenLandingPageIsOpenAndTheTitleIs(APP_TITLE)

        then: 'Page displays the internall error message'
        landingPage.inlineMainErrorMessageContainsHeader(ERROR_999)

        cleanup: 'Reset response to default'
        sendRequest(MOCK_UNBLOCK_URL)
    }

    def 'Check if Details Panel has error handling on User Rights'() {
        setup: 'Reset response to default'
        sendRequest(MOCK_UNBLOCK_URL)

        when: 'Open the landing page and make sure title is Counter Management'
        landingPage.whenLandingPageIsOpenTheTitleIsAndTableIsVisible(APP_TITLE)

        and: 'Open Details Panel'
        landingPage.clickOnInformationIcon()

        and: 'The Details panel is open'
        landingPage.theDetailPanelIs(OPEN)

        and: 'Set response to 403'
        sendRequest(MOCK_BLOCK_URL + 403)

        and: 'Click the flex counter to see the details'
        landingPage.selectCounter(FLEX_COUNTER1)

        then: 'Page displays error 403 message'
        landingPage.inlineDetailsErrorMessageContainsHeader(ERROR_403)

        cleanup: 'Reset response to default'
        sendRequest(MOCK_UNBLOCK_URL)
    }

    def 'Check if Details Panel has error handling on Unknown Error'() {
        setup: 'Reset response to default'
        sendRequest(MOCK_UNBLOCK_URL)

        when: 'Open the landing page and make sure title is Counter Management'
        landingPage.whenLandingPageIsOpenTheTitleIsAndTableIsVisible(APP_TITLE)

        and: 'Open Details Panel'
        landingPage.clickOnInformationIcon()

        and: 'The Details panel is open'
        landingPage.theDetailPanelIs(OPEN)

        and: 'Set response to 409'
        sendRequest(MOCK_BLOCK_URL + 409)

        and: 'Click the flex counter to see the details'
        landingPage.selectCounter(FLEX_COUNTER1)

        then: 'Page displays error 403 message'
        landingPage.inlineDetailsErrorMessageContainsHeader(ERROR_UNKNOWN)

        cleanup: 'Reset response to default'
        sendRequest(MOCK_UNBLOCK_URL)
    }

    def 'Check if Create EBS counter create has error handling on User Rights'() {
        setup: 'Set response to 403'
        sendRequest(MOCK_BLOCK_URL + 403)

        when: 'Open the create page and make sure title is Create EBS Flex Counter'
        createFlexCounter.whenLandingPageIsOpenTheTitleIs(CREATE_APP_TITLE)

        and: 'Node select dropdown exist and contains "Select Node Type"'
        createFlexCounter.whenDropDownEmptyDefaultTextIs("Select Node Type")

        and: 'Expand the dropdown and item list contains clickable item "RadioNode"'
        createFlexCounter.whenDropDownExpandItContainsClickableItem('RadioNode', true)

        and: 'Drop down change to "5GRadio Node" '
        createFlexCounter.whenDropDownChangeToValueItIs('RadioNode')

        then: 'Page displays error 403 popup message'
        landingPage.popupErrorMessageContainsHeader(ERROR_403)

        cleanup: 'Reset response to default'
        sendRequest(MOCK_UNBLOCK_URL)
    }

}