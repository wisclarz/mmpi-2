const About = Vue.component("about-view", {
    template: "#about-view-template",
    data: function () {
        return {
            gender: localStorage.getItem('mmpi2_gender') || 'male'
        };
    },
    methods: {
        setGender: function (g) {
            this.gender = g;
        },
        saveGender: function () {
            localStorage.setItem('mmpi2_gender', this.gender);
        }
    }
});
