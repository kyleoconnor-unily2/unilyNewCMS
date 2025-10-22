module.exports = {
    projectName: "extendexample",
    dependencies: {
        applicationFederatedModules: [
            "ui-library",
            /* 
                'app-state',
                'ui-library'
                ...
            */
        ],
        unilyFederatedModules: [
            "unily-application",
            "unily-token-provider",
            "unily-apis",
            "unily-ui-library",
            "unily-common",
        ],
        myFederatedModules: [
            /*
                'app-state',
                'counter'
                ...
            */
        ],
        dev: {
            /*
                'counter': {
                    url: 'http://localhost:4203', isLazyLoaded: true 
                }
                ...
            */
        },
    },
    /**
     * Fetch your endpoint and auth token from
     * 'My Federated Modules' or 'Application Federated Modules' pages
     * by clicking on 'Get PAT Token' and copying the values provided
     * in the overlay.
     */
    endpoint: "https://clientdev4-cms.unily.com",
    authToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6IkVBNTZGRDUzQjZBQzA4MTZGOTBENzQ3QjIzQTZFMDk4M0Y4QUIxMjlSUzI1NiIsIng1dCI6IjZsYjlVN2FzQ0JiNURYUjdJNmJnbUQtS3NTayIsInR5cCI6ImF0K2p3dCJ9.eyJpc3MiOiJodHRwczovL2NsaWVudGRldjQtaWRzcnYudW5pbHkuY29tIiwibmJmIjoxNzU5MTQ5NjEyLCJpYXQiOjE3NTkxNDk2MTIsImV4cCI6MTc1OTE1MzIxMiwiYXVkIjpbIlVuaWx5QXBpIiwiaHR0cHM6Ly9jbGllbnRkZXY0LWlkc3J2LnVuaWx5LmNvbS9yZXNvdXJjZXMiXSwic2NvcGUiOlsidW5pbHkubW9kdWxlZmVkZXJhdGlvbndvcmtzcGFjZTpyZWFkIiwidW5pbHkubW9kdWxlZmVkZXJhdGlvbndvcmtzcGFjZTpyZWFkV3JpdGUiXSwiYW1yIjpbIm1pY3Jvc2VydmljZV9ub25faWRlbnRpdHlfdXNlcnMiXSwiY2xpZW50X2lkIjoiVW5pbHlNb2R1bGVGZWRlcmF0aW9uQ2xpZW50SWRfMzAxMTEwIiwic3ViIjoiMzAxMTEwLzE4OTQiLCJhdXRoX3RpbWUiOjE3NTkxNDk2MTIsImlkcCI6ImxvY2FsIiwidW5pbHk6Y2xpZW50X2NvZGUiOiIzMDExMTAvMTg5NCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMzAxMTEwLzE4OTQiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMzAxMTEwLzE4OTQiLCJqdGkiOiI1NDhEQkMyRDIwOUJBMUY5NDYyNDM3QzQ2QTQ3QUEwQiJ9.bv6tkYY_Tylvmcw5gFhgXwCxqmlmHfU3egyGYimGACiafxeAeOTVFY7qUs4D2QgnFpjp61f4vaIauTei12WJyxDl3ZhuwOslgoCfvKYBgh4f16iqEIIRFeG_iBdpHXt22INjufp8O9SxoTwK27JmUzxhHgNmTrsoyqQMGDPea8qShXJHc6_BmpxljrjM82tiHgecoV0ZfJ9un1uO7XkysICshBFbElqw_3lj3iRQ-cG0m09ivCRvJqwLb_JzsHM0DAHLVwmek6Xzef5iRTLv119cY_WyOUNT0NQKIYCa9xeYhGFpL5CF9LkJy_xQVmgueDUF9V9IkactBs05d1m1KA",
};
