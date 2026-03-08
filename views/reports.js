var Reports = Vue.component("reports-view", {
    template: "#reports-view-template",
    data: function () {
        return {
            reports: [],
            loading: true,
            error: ''
        };
    },
    created: function () {
        this.loadReports();
    },
    methods: {
        loadReports: function () {
            var vm = this;
            vm.loading = true;
            vm.error = '';

            ResultsService.getAllResults(100)
                .then(function (snapshot) {
                    var list = [];
                    snapshot.forEach(function (doc) {
                        var data = doc.data();
                        var date = 'Bilinmiyor';
                        if (data.createdAt && data.createdAt.toDate) {
                            var d = data.createdAt.toDate();
                            date = d.toLocaleDateString('tr-TR') + ' ' + d.toLocaleTimeString('tr-TR');
                        }
                        list.push({
                            id: doc.id,
                            name: data.name || 'İsimsiz',
                            gender: data.gender || 'male',
                            date: date,
                            answeredCount: data.answers ? Object.keys(data.answers).length : 0
                        });
                    });
                    vm.reports = list;
                    vm.loading = false;
                })
                .catch(function (err) {
                    console.error('Reports load error:', err);
                    vm.error = 'Raporlar yüklenirken bir hata oluştu.';
                    vm.loading = false;
                });
        },

        openReport: function (id) {
            this.$router.push('/report/' + id);
        }
    }
});
