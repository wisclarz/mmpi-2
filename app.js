var routes = [
    {
        path: "/",
        name: "about",
        component: About
    },
    {
        path: "/test",
        redirect: "/test/1"
    },
    {
        path: "/test/:question",
        name: "test",
        component: Test
    },
    {
        path: "/report/:id",
        name: "report",
        component: Report
    },
    {
        path: "/reports",
        name: "reports",
        component: Reports
    },
    {
        path: "/report",
        redirect: "/reports"
    }
];

var router = new VueRouter({
    routes: routes,
    scrollBehavior: function () {
        return { x: 0, y: 0 };
    }
});

var app = new Vue({
    el: "#app",
    router: router
});
