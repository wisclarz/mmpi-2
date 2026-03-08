const Report = Vue.component("report-view", {
    template: "#report-view-template",
    data: function () {
        return {
            scaleCategories: [],
            answers: {},
            gender: "male",
            scores: {},
            chartReady: false,
            chartData: {
                labels: [],
                datasets: []
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: true,
                legend: { display: false },
                scales: {
                    yAxes: [{
                        ticks: {
                            min: 30,
                            max: 120,
                            stepSize: 10,
                            fontColor: '#9494b8',
                            fontSize: 11
                        },
                        gridLines: {
                            color: 'rgba(255,255,255,0.05)',
                            zeroLineColor: 'rgba(255,255,255,0.1)'
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontColor: '#9494b8',
                            fontSize: 11
                        },
                        gridLines: {
                            color: 'rgba(255,255,255,0.05)'
                        }
                    }]
                },
                elements: {
                    line: {
                        tension: 0,
                        borderColor: '#7c5cfc',
                        borderWidth: 2,
                        backgroundColor: 'rgba(124, 92, 252, 0.1)'
                    },
                    point: {
                        radius: 4,
                        backgroundColor: '#7c5cfc',
                        borderColor: '#7c5cfc',
                        hoverRadius: 6
                    }
                },
                tooltips: {
                    backgroundColor: '#1a1a2e',
                    titleFontColor: '#e8e8f0',
                    bodyFontColor: '#9494b8',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: false
                }
            },
            // Scale name translations
            scaleTranslations: {
                "Hypochondriasis": "Hipokondriazis",
                "Depression": "Depresyon",
                "Hysteria": "Histeri",
                "Psychopathic Deviate": "Psikopatik Sapma",
                "Masculinity-Femininity": "Erkeksilik-Kadınsılık",
                "Paranoia": "Paranoya",
                "Psychasthenia": "Psikasteni",
                "Schizophrenia": "Şizofreni",
                "Hypomania": "Hipomani",
                "Social Introversion": "Sosyal İçedönüklük",
                "Infrequency": "Seyreklik",
                "Lie": "Yalan",
                "Uncommon Virtues": "Nadir Erdemler",
                "Correction": "Düzeltme",
                "Variable Response Inconsistency": "Değişken Tepki Tutarsızlığı",
                "True Response Inconsistency": "Doğru Tepki Tutarsızlığı",
                "Fake Bad Scale": "Kötü Gösterim Ölçeği",
                "Backside F": "Arka F",
                "Infrequency Psychopathology": "Seyreklik-Psikopatoloji",
                "Superlative Self-Presentation": "Üstün Kendini Sunma",
                "Subjective Depression": "Öznel Depresyon",
                "Psychomotor Retardation": "Psikomotor Yavaşlama",
                "Physical Malfunctioning": "Fiziksel İşlev Bozukluğu",
                "Mental Dullness": "Zihinsel Durgunluk",
                "Brooding": "Ruminasyon",
                "Denial of Social Anxiety": "Sosyal Kaygının İnkarı",
                "Need for Affection": "Sevgi İhtiyacı",
                "Lassitude-malaise": "Halsizlik-Kırgınlık",
                "Somatic Complaints": "Somatik Yakınmalar",
                "Inhibition of Aggression": "Saldırganlığın Bastırılması",
                "Familial Discord": "Ailevi Uyumsuzluk",
                "Authority Problems": "Otorite Sorunları",
                "Social Impertubability": "Sosyal Rahatlık",
                "Social Imperturbability": "Sosyal Rahatlık",
                "Social Alienation": "Sosyal Yabancılaşma",
                "Self-alienation": "Kendine Yabancılaşma",
                "Persecutory Ideas": "Kötülük Görme Düşünceleri",
                "Poignancy": "Duyarlılık",
                "Naivete": "Saflık",
                "Emotional Alienation": "Duygusal Yabancılaşma",
                "Lack of Ego Mastery, Cognitive": "Ego Hakimiyetsizliği, Bilişsel",
                "Lack of Ego Mastery, Conative": "Ego Hakimiyetsizliği, İradî",
                "Lack of Ego Mastery, Defective Inhibition": "Ego Hakimiyetsizliği, Eksik Ketleme",
                "Bizarre Sensory Experiences": "Tuhaf Duyusal Yaşantılar",
                "Amorality": "Ahlaksızlık",
                "Psychomotor Acceleration": "Psikomotor Hızlanma",
                "Imperturbability": "Sakinlik",
                "Ego Inflation": "Ego Şişkinliği",
                "Shyness/Self-Consciousness": "Utangaçlık/Öz-bilinç",
                "Social Avoidance": "Sosyal Kaçınma",
                "Self/Other Alienation": "Kendine/Başkalarına Yabancılaşma",
                "Anxiety": "Kaygı",
                "Fears": "Korkular",
                "Obsessivness": "Obsesiflik",
                "Health Concerns": "Sağlık Kaygıları",
                "Bizarre Mentation": "Tuhaf Düşünce",
                "Anger": "Öfke",
                "Cynicism": "Sinizm",
                "Antisocial Practices": "Antisosyal Davranışlar",
                "Antisocial Behavior": "Antisosyal Davranış",
                "Type A": "A Tipi Davranış",
                "Low Self-esteem": "Düşük Özsaygı",
                "Social Discomfort": "Sosyal Rahatsızlık",
                "Family Problems": "Aile Sorunları",
                "Work Interference": "İş Bozuklukları",
                "Negative Treatment Indicators": "Olumsuz Tedavi Göstergeleri",
                "Repression": "Bastırma",
                "Ego Strength": "Ego Gücü",
                "MacAndrew Alcoholism Scale-Revised": "MacAndrew Alkolizm Ölçeği-R",
                "Addiction Acknowledgement": "Bağımlılık Kabulü",
                "Addiction Potential": "Bağımlılık Potansiyeli",
                "Marital Distress": "Evlilik Sıkıntısı",
                "Hostility": "Düşmanlık",
                "Overcontrolled Hostility": "Aşırı Kontrollü Düşmanlık",
                "Dominance": "Baskınlık",
                "Social Responsibility": "Sosyal Sorumluluk",
                "College Maladjustment": "Üniversite Uyumsuzluğu",
                "Masculine Gender Role": "Erkeksi Cinsiyet Rolü",
                "Feminine Gender Role": "Kadınsı Cinsiyet Rolü",
                "Post-traumatic Stress Disorder": "Travma Sonrası Stres Bozukluğu",
                "Demoralization": "Moralsizlik",
                "Low Positive Emotions": "Düşük Olumlu Duygular",
                "Ideas of Persecution": "Kötülük Görme Fikirleri",
                "Dysfunctional Negative Emotions": "İşlevsel Olmayan Olumsuz Duygular",
                "Aberrant Experiences": "Sapkın Deneyimler",
                "Hypomanic Activation": "Hipomanik Aktivasyon",
                "Aggressiveness": "Saldırganlık",
                "Psychoticism": "Psikotisizm",
                "Disconstraint": "Kısıtlamasızlık",
                "Negative Emotionality / Neuroticism": "Olumsuz Duygusallık / Nevrotizm",
                "Introversion / Low Positive Emotionality": "İçedönüklük / Düşük Olumlu Duygusallık",
                "Depression, Obvious": "Depresyon, Belirgin",
                "Depression, Subtle": "Depresyon, Örtük",
                "Hysteria, Obvious": "Histeri, Belirgin",
                "Hysteria, Subtle": "Histeri, Örtük",
                "Psychpathic Deviate, Obvious": "Psikopatik Sapma, Belirgin",
                "Psychopathic Deviate, Obvious": "Psikopatik Sapma, Belirgin",
                "Psychopathic Deviate, Subtle": "Psikopatik Sapma, Örtük",
                "Paranoia, Obvious": "Paranoya, Belirgin",
                "Paranoia, Subtle": "Paranoya, Örtük",
                "Hypomania, Obvious": "Hipomani, Belirgin",
                "Hypomania, Obvoius": "Hipomani, Belirgin",
                "Hypomania, Subtle": "Hipomani, Örtük",
                "Generalized Fearfulness": "Genel Korku",
                "Multiple Fears": "Çoklu Korkular",
                "Lack of Drive": "Dürtü Eksikliği",
                "Dysphoria": "Disfori",
                "Self-Depreciation": "Kendini Küçümseme",
                "Suicidal Ideation": "İntihar Düşünceleri",
                "Gastrointestinal Symptoms": "Gastrointestinal Belirtiler",
                "Neurological Symtoms": "Nörolojik Belirtiler",
                "General Health Concerns": "Genel Sağlık Kaygıları",
                "Psychotic Symptomatology": "Psikotik Semptomatoloji",
                "Schizotypal Characteristics": "Şizotipal Özellikler",
                "Explosive Behavior": "Patlamacı Davranış",
                "Irritability": "Öfkelilik",
                "Misanthropic Beliefs": "Misantropik İnançlar",
                "Interpersonal Suspiciousness": "Kişilerarası Kuşkuculuk",
                "Antisocial Attitudes": "Antisosyal Tutumlar",
                "Impatience": "Sabırsızlık",
                "Competitive Drive": "Rekabet Dürtüsü",
                "Self-Doubt": "Kendinden Kuşku",
                "Submissiveness": "Boyun Eğicilik",
                "Introversion": "İçedönüklük",
                "Shyness": "Utangaçlık",
                "Family Discord": "Aile İçi Geçimsizlik",
                "Familial Alienation": "Ailevi Yabancılaşma",
                "Low Motivation": "Düşük Motivasyon",
                "Inability to Disclose": "Açıklayamama"
            },
            categoryTranslations: {
                "Response Inconsistency Scales": "Tepki Tutarsızlığı Ölçekleri",
                "Validity Scales": "Geçerlilik Ölçekleri",
                "Clinical Scales": "Klinik Ölçekler",
                "RC Scales": "RC Ölçekleri (Yeniden Yapılandırılmış)",
                "Content Scales": "İçerik Ölçekleri",
                "Supplementary Scales": "Ek Ölçekler",
                "PSY-5 Scales": "PSY-5 Ölçekleri"
            }
        };
    },
    computed: {
        hasAnswers: function () {
            return Object.keys(this.answers).length > 0;
        }
    },
    created: function () {
        var vm = this;
        // Load gender
        vm.gender = localStorage.getItem('mmpi2_gender') || 'male';
        // Load answers from localStorage
        var saved = localStorage.getItem('mmpi2_answers');
        if (saved) {
            try {
                vm.answers = JSON.parse(saved);
            } catch (e) {
                vm.answers = {};
            }
        }
        // Load scales data
        vm.loadScales();
    },
    methods: {
        loadScales: function () {
            var vm = this;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'data/scales.json', true);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    vm.scaleCategories = JSON.parse(xhr.responseText);
                    if (vm.hasAnswers) {
                        vm.grade();
                    }
                }
            };
            xhr.send();
        },

        calculateTScore: function (rawScore, scale) {
            var tScores = scale.tScores[this.gender];
            if (!tScores) return rawScore;

            if (scale.kCorrection) {
                var kScore = (this.scores["K"] || 0) * scale.kCorrection + rawScore;
                rawScore = Math.floor(kScore + 0.5);
            }
            if (scale.scoreOffsets && scale.scoreOffsets[this.gender]) {
                rawScore -= scale.scoreOffsets[this.gender];
            }
            return tScores[Math.max(0, Math.min(rawScore, tScores.length - 1))];
        },

        gradeScale: function (scale) {
            var vm = this;
            if (scale.gender && scale.gender !== vm.gender) return;

            var rawScore = scale.baseScore || 0;

            scale.answers.forEach(function (v) {
                // Each answer entry: [questionNum, expectedAnswer] or [q1, a1, q2, a2, scoreVal]
                if (v.length === 2) {
                    // Simple: [question, expected_answer]
                    if (vm.answers[v[0]] === v[1]) {
                        rawScore++;
                    }
                } else if (v.length === 5) {
                    // Pair comparison: [q1, a1, q2, a2, score]
                    if (vm.answers[v[0]] === v[1] && vm.answers[v[2]] === v[3]) {
                        rawScore += v[4];
                    }
                }
            });

            if (scale.subScales) {
                scale.subScales.forEach(function (sub) {
                    vm.gradeScale(sub);
                });
            }

            if (scale.tScores) {
                vm.scores[scale.name] = vm.calculateTScore(rawScore, scale);
            } else {
                vm.scores[scale.name] = rawScore;
            }
        },

        grade: function () {
            var vm = this;
            vm.scores = {};

            vm.scaleCategories.forEach(function (category) {
                category.items.forEach(function (item) {
                    vm.gradeScale(item);
                });
            });

            // Build chart data for clinical profile
            var clinicalLabels = ["VRIN", "TRIN", "F", "Fp", "FBS", "L", "K", "S", "Hs", "D", "Hy", "Pd", "Mf", "Pa", "Pt", "Sc", "Ma", "Si"];
            var clinicalData = [];

            clinicalLabels.forEach(function (name) {
                var val = vm.scores[name];
                clinicalData.push(val !== undefined ? val : null);
            });

            vm.chartData = {
                labels: clinicalLabels,
                datasets: [{
                    label: 'T Skoru',
                    data: clinicalData,
                    lineTension: 0,
                    borderColor: '#7c5cfc',
                    backgroundColor: 'rgba(124, 92, 252, 0.08)',
                    borderWidth: 2,
                    pointBackgroundColor: '#7c5cfc',
                    pointBorderColor: '#7c5cfc',
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    fill: true
                }]
            };

            vm.chartReady = true;
        },

        getScoreClass: function (score) {
            if (score === undefined || score === null) return '';
            if (score >= 65) return 'score-elevated';
            if (score >= 55) return 'score-moderate';
            return 'score-normal';
        },

        getScoreLabel: function (score) {
            if (score === undefined || score === null) return '';
            if (score >= 75) return 'Çok Yüksek';
            if (score >= 65) return 'Yüksek';
            if (score >= 55) return 'Orta';
            if (score >= 45) return 'Normal';
            return 'Düşük';
        },

        getBarClass: function (score) {
            if (score >= 65) return 'bar-elevated';
            if (score >= 55) return 'bar-moderate';
            return 'bar-normal';
        },

        translateScale: function (title) {
            return this.scaleTranslations[title] || title;
        },

        translateCategory: function (title) {
            return this.categoryTranslations[title] || title;
        },

        clearResults: function () {
            localStorage.removeItem('mmpi2_answers');
            localStorage.removeItem('mmpi2_gender');
            this.answers = {};
            this.scores = {};
            this.chartReady = false;
            this.$router.push('/');
        }
    }
});
