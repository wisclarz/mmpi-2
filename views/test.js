var Test = Vue.component("test-view", {
    template: "#test-view-template",
    data: function () {
        return {
            questions: typeof window.questions !== 'undefined' ? window.questions : [],
            answers: {},
            submitting: false
        };
    },
    created: function () {
        var saved = localStorage.getItem('mmpi2_answers');
        if (saved) {
            try {
                this.answers = JSON.parse(saved);
            } catch (e) {
                this.answers = {};
            }
        }
        if (!this.$route.params.question) {
            var answeredKeys = Object.keys(this.answers).map(Number).sort(function(a, b) { return a - b; });
            var nextQuestion = 1;
            if (answeredKeys.length > 0) {
                // İlk cevaplanmamış soruyu bul
                for (var i = 1; i <= this.questions.length - 1; i++) {
                    if (this.answers[i] === undefined) {
                        nextQuestion = i;
                        break;
                    }
                }
            }
            this.$router.replace('/test/' + nextQuestion);
        }
    },
    computed: {
        currentQuestion: function () {
            var q = parseInt(this.$route.params.question);
            if (isNaN(q) || q < 1) return 1;
            if (q >= this.questions.length) return this.questions.length - 1;
            return q;
        },
        progressPercent: function () {
            if (this.questions.length <= 1) return 0;
            return Math.floor((this.answeredCount / (this.questions.length - 1)) * 100);
        },
        answeredCount: function () {
            return Object.keys(this.answers).length;
        },
        allAnswered: function () {
            return this.answeredCount >= this.questions.length - 1;
        },
        navPages: function () {
            var pages = [];
            var start = Math.max(1, this.currentQuestion - 1);
            var end = Math.min(start + 7, this.questions.length - 1);
            for (var i = start; i <= end; i++) {
                pages.push(i);
            }
            return pages;
        }
    },
    methods: {
        answer: function (state) {
            var vm = this;
            if (vm.submitting) return;

            vm.$set(vm.answers, vm.currentQuestion, state);
            localStorage.setItem('mmpi2_answers', JSON.stringify(vm.answers));

            var next = vm.currentQuestion + 1;
            if (next < vm.questions.length) {
                vm.$router.push({ name: "test", params: { question: String(next) } });
            }

            if (vm.answeredCount >= vm.questions.length - 1) {
                vm.submitTest();
            }
        },

        submitTest: function () {
            var vm = this;
            if (vm.submitting) return;
            vm.submitting = true;

            var userName = localStorage.getItem('mmpi2_name') || 'İsimsiz';
            var userGender = localStorage.getItem('mmpi2_gender') || 'male';

            ScoringService.loadScalesAndGrade(vm.answers, userGender, function (scores, scaleCategories) {
                if (!scores) {
                    alert('Skorlar hesaplanırken bir hata oluştu. Lütfen tekrar deneyin.');
                    vm.submitting = false;
                    return;
                }

                ResultsService.saveResult({
                    name: userName,
                    gender: userGender,
                    answers: vm.answers,
                    scores: scores
                }).then(function (docRef) {
                    localStorage.removeItem('mmpi2_answers');
                    localStorage.removeItem('mmpi2_current_report');
                    vm.$router.push('/report/' + docRef.id);
                }).catch(function (error) {
                    console.error('Firestore save error:', error);
                    alert('Sonuç kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.');
                    vm.submitting = false;
                });
            });
        },

        isAnswered: function (n) {
            return this.answers[n] !== undefined;
        }
    }
});
