package com.ericsson.nms.pres.countermanagement.testware.specs

import com.ericsson.nms.pres.countermanagement.testware.pages.CmMainPage as CoreSteps

import org.jboss.arquillian.graphene.page.Page
import org.jboss.arquillian.spock.ArquillianSputnik
import org.junit.runner.RunWith
import spock.lang.Specification

import static com.ericsson.nms.pres.countermanagement.testware.LocalConstants.APP_TITLE as COUNTER_MANAGEMENT

@RunWith(ArquillianSputnik)
class CmSpec extends Specification {
    @Page CoreSteps coreSteps

    def 'Hello Counter Manager'() {
        given: 'Open the landing page and make sure title is Counter Management'
        coreSteps.whenLandingPageIsOpenTheTitleIsAndTableIsVisible(COUNTER_MANAGEMENT)
    }

    def 'Goto Create EBS Flex Counter'() {
        given: 'Open the landing page and make sure title is Counter Management'
        coreSteps.whenLandingPageIsOpenTheTitleIsAndTableIsVisible(COUNTER_MANAGEMENT)

        and: 'Click Create action and make sure view change to Create EBS Flex Counter'
        coreSteps.whenClickOnCreateIsOpenCreatePage()
    }
}
