const Test = Vue.component("test-view", {
    template: "#test-view-template",
    data: function () {
        return {
            questions: typeof window.questions !== 'undefined' ? window.questions : [],
            answers: {}
        };
    },
    created: function () {
        // Load saved answers from localStorage
        var saved = localStorage.getItem('mmpi2_answers');
        if (saved) {
            try {
                this.answers = JSON.parse(saved);
            } catch (e) {
                this.answers = {};
            }
        }
        // Redirect to question 1 if no question param
        if (!this.$route.params.question) {
            this.$router.replace('/test/1');
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
            var start = Math.max(1, this.currentQuestion - 3);
            var end = Math.min(start + 7, this.questions.length - 1);
            start = Math.max(1, end - 7);
            for (var i = start; i <= end; i++) {
                pages.push(i);
            }
            return pages;
        }
    },
    methods: {
        answer: function (state) {
            var vm = this;
            // Use Vue.set for reactivity
            vm.$set(vm.answers, vm.currentQuestion, state);
            // Save to localStorage
            localStorage.setItem('mmpi2_answers', JSON.stringify(vm.answers));
            // Navigate to next question
            var next = vm.currentQuestion + 1;
            if (next < vm.questions.length) {
                vm.$router.push({ name: "test", params: { question: String(next) } });
            } else {
                // All questions answered, save to history and go to report
                var historyStr = localStorage.getItem('mmpi2_history');
                var history = historyStr ? JSON.parse(historyStr) : [];
                var userName = localStorage.getItem('mmpi2_name') || 'İsimsiz';
                var userGender = localStorage.getItem('mmpi2_gender') || 'male';

                var entryId = Date.now().toString();
                history.push({
                    id: entryId,
                    name: userName,
                    gender: userGender,
                    date: new Date().toLocaleDateString('tr-TR') + ' ' + new Date().toLocaleTimeString('tr-TR'),
                    answers: vm.answers
                });
                localStorage.setItem('mmpi2_history', JSON.stringify(history));
                localStorage.setItem('mmpi2_current_report', entryId);

                vm.$router.push({ name: "report", query: { id: entryId } });
            }
        },
        isAnswered: function (n) {
            return this.answers[n] !== undefined;
        }
    }
});
