define({
    defaultApp: 'countermanagement',
    name: 'Ericsson Network Manager',
    components: [
        {
            path: 'logoutbutton'
        },
        {
            path: 'flyout'
        },
        {
            path: 'helpbutton'
        },
        {
            path: 'navigation'
        },
        {
            path: 'contextmenu'
        }
    ],
    properties: {
        navigation: {
            content: 'navigation-app-list'
        },
        'navigation-app-list': { url: '/rest/apps' }
    }
});
