var About = Vue.component("about-view", {
    template: "#about-view-template",
    data: function () {
        return {
            gender: localStorage.getItem('mmpi2_gender') || 'male',
            name: localStorage.getItem('mmpi2_name') || ''
        };
    },
    methods: {
        setGender: function (g) {
            this.gender = g;
        },
        startTest: function (e) {
            if (!this.name.trim()) {
                if (e) e.preventDefault();
                alert('Lütfen teste başlamadan önce isminizi giriniz.');
                return;
            }
            localStorage.setItem('mmpi2_gender', this.gender);
            localStorage.setItem('mmpi2_name', this.name.trim());
            localStorage.removeItem('mmpi2_answers');
            this.$router.push('/test/1');
        }
    }
});
