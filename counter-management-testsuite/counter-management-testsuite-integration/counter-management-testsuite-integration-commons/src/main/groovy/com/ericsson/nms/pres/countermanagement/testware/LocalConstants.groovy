package com.ericsson.nms.pres.countermanagement.testware

import org.openqa.selenium.Dimension

class LocalConstants {
    final static BASE_URL = 'http://localhost:8585/'
    final static MOCK_BLOCK_URL = 'test/counter-management-mock/block/'
    final static MOCK_UNBLOCK_URL = 'test/counter-management-mock/unblock'
    final static APP_TITLE = 'Counter Management'
    final static CREATE_APP_TITLE = 'Create EBS Flex Counter'
    final static DETAILS_TITLE = 'Details'
    final static OPEN = 'Open'
    final static CLOSE = 'Close'
    final static DEFAULT_DIMENSION = new Dimension(1500, 880)
    final static ERROR_403 = 'Access Denied'
    final static ERROR_999 = 'Unable to Retrieve Data'
    final static ERROR_UNKNOWN = 'Internal error'

    private LocalConstants() {}

    class XPathRelatives {
        final static String PARENT = "/parent::"
        final static String PARENT_ALL = "/parent::*"
        final static String NEXT_SIBLING = "/following-sibling::"
        final static String PRECEDING_SIBLING = "/preceding-sibling::"
        final static String ANY_ANCESTOR = "/ancestor::*["
        final static String ANCESTOR = "//ancestor::"
        final static String CHILD = "/child::"
        final static String DESCENDANT = "/descendant::"
    }

    class XPathElements {
        final static String DIV = "//Div["
        final static String DIV_INSIDE = "div["
        final static String SPAN = "//Span["
        final static String BUTTON = "//Button["
        final static String ICON = "//i["
        final static String ROW = "//tr["
        final static String ICON_INSIDE = "i"
        final static String INPUT = "//input["
        final static String TEXTAREA = "//TEXTAREA["
        final static String PARAGRAPH = "//p["
        final static String ANY_ELEMENT = "//*"
        final static String ANY_ELEMENT_INSIDE = "*["
        final static String A = "//a["
        final static String TD = "//td["
        final static String TD_SHORT = "td["
        final static String LABEL = "//label["
    }

    class XPathAttributes {
        final static String CLASS = "@class,'"
        final static String CLASS_EQ = "@class='"
        final static String TITLE = "@title,'"
        final static String TITLE_EQ = "@title='"
        final static String TYPE_EQ = "@type='"
        final static String TEXT = "text(),'"
        final static String TEXT_EQ = "text()='"
        final static String DATA_ID_EQ = "@data-id='"

    }

    class XPathOthers {
        final static String CONTAINS = "contains("
        final static String OR = "' or "
        final static String AND = "' and "
        final static String AND_PARENTHENSIS = "') and "
        final static String CLOSE = "')]"
        final static String CLOSE_SHORT = "']"
        final static String OPEN_BRACKET = "["
        final static String CLOSE_BRACKET = "]"
        final static String CLOSE_PARENTHESIS_AND = "') and "
    }
}
