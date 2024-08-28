package com.ericsson.nms.pres.countermanagement.testware.specs

import com.ericsson.nms.pres.countermanagement.testware.pages.CmCreateFlexCounterPage as CreateFlexCounterSteps

import org.jboss.arquillian.graphene.page.Page
import org.jboss.arquillian.spock.ArquillianSputnik
import org.junit.runner.RunWith
import spock.lang.Specification

import static com.ericsson.nms.pres.countermanagement.testware.LocalConstants.CREATE_APP_TITLE as CTREATE_EBS_FLEX_COUNTER

@RunWith(ArquillianSputnik)
class CmCreateSpec extends Specification {

    @Page CreateFlexCounterSteps createFlexCounterSteps

    def 'Open Create EBS counter create page'() {
        given: 'Open the create page and make sure title is Create EBS Flex Counter'
        createFlexCounterSteps.whenLandingPageIsOpenTheTitleIs(CTREATE_EBS_FLEX_COUNTER)
    }

    def 'Node select dropdown exist in create flex counter page'() {
        given: 'Node select dropdown exist and contains "Select Node Type"'
        createFlexCounterSteps.whenDropDownEmptyDefaultTextIs("Select Node Type")

        and: 'Expand the dropdown and item list contains clickable item "RadioNode"'
        createFlexCounterSteps.whenDropDownExpandItContainsClickableItem('RadioNode', true)

        and: 'Drop down change to "5GRadio Node" '
        createFlexCounterSteps.whenDropDownChangeToValueItIs('RadioNode')
    }
}