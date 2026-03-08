var Report = Vue.component("report-view", {
    template: "#report-view-template",
    data: function () {
        return {
            loading: true,
            error: '',
            scaleCategories: [],
            answers: {},
            gender: "male",
            userName: '',
            reportDate: '',
            scores: {},
            chartReady: false,
            promptCopied: false,
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
                "Antisocial Practices": "Antisosyal Davranışlar",
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
                "Low Positive Emotions": "Düşük Olumlu Duygular",
                "Dysfunctional Negative Emotions": "İşlevsel Olmayan Olumsuz Duygular",
                "Aberrant Experiences": "Sapkın Deneyimler",
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
                "Inability to Disclose": "Açıklayamama",
                "Cynicism": "Sinizm",
                "Demoralization": "Demoralizasyon",
                "Antisocial Behavior": "Antisosyal Davranış",
                "Ideas of Persecution": "Kötülük Görme Fikirleri",
                "Hypomanic Activation": "Hipomanik Aktivasyon",
                "Aggressiveness": "Saldırganlık"
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
        },
        aiPrompt: function () {
            return this.buildAiPrompt();
        },
        formattedAnswers: function () {
            var vm = this;
            var list = [];
            if (!window.questions) return list;

            for (var i = 1; i <= 567; i++) {
                if (vm.answers[i] !== undefined) {
                    list.push({
                        text: window.questions[i] || ('Soru ' + i),
                        value: vm.answers[i]
                    });
                }
            }
            return list;
        }
    },
    created: function () {
        var vm = this;
        var reportId = vm.$route.params.id;

        if (!reportId) {
            vm.loading = false;
            vm.error = 'Rapor ID belirtilmemiş.';
            return;
        }

        ResultsService.getResult(reportId)
            .then(function (doc) {
                if (!doc.exists) {
                    vm.loading = false;
                    vm.error = 'Rapor bulunamadı. Geçersiz veya silinmiş bir rapor bağlantısı kullanıyor olabilirsiniz.';
                    return;
                }

                var data = doc.data();
                vm.answers = data.answers || {};
                vm.gender = data.gender || 'male';
                vm.userName = data.name || 'İsimsiz';
                vm.scores = data.scores || {};

                if (data.createdAt && data.createdAt.toDate) {
                    var d = data.createdAt.toDate();
                    vm.reportDate = d.toLocaleDateString('tr-TR') + ' ' + d.toLocaleTimeString('tr-TR');
                } else {
                    vm.reportDate = 'Bilinmiyor';
                }

                vm.loadScales();
            })
            .catch(function (err) {
                console.error('Report load error:', err);
                vm.loading = false;
                vm.error = 'Rapor yüklenirken bir hata oluştu. Lütfen tekrar deneyin.';
            });
    },
    methods: {
        loadScales: function () {
            var vm = this;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'data/scales.json', true);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    vm.scaleCategories = JSON.parse(xhr.responseText);

                    if (!vm.scores || Object.keys(vm.scores).length === 0) {
                        vm.scores = ScoringService.gradeAll(vm.scaleCategories, vm.answers, vm.gender);
                    }

                    vm.buildChart();
                    vm.loading = false;
                } else {
                    vm.error = 'Ölçek verileri yüklenemedi.';
                    vm.loading = false;
                }
            };
            xhr.onerror = function () {
                vm.error = 'Ölçek verileri yüklenemedi.';
                vm.loading = false;
            };
            xhr.send();
        },

        buildChart: function () {
            var vm = this;
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

        copyLink: function () {
            var url = window.location.href;
            if (navigator.clipboard) {
                navigator.clipboard.writeText(url);
            }
        },

        copyPrompt: function () {
            var vm = this;
            if (navigator.clipboard) {
                navigator.clipboard.writeText(vm.aiPrompt).then(function () {
                    vm.promptCopied = true;
                    setTimeout(function () { vm.promptCopied = false; }, 2000);
                });
            }
        },

        getScoreStr: function (name) {
            var s = this.scores[name];
            return s !== undefined ? String(s) : '—';
        },

        buildAiPrompt: function () {
            var vm = this;
            if (!vm.scaleCategories.length || !Object.keys(vm.scores).length) return '';

            var s = function (name) { return vm.getScoreStr(name); };
            var L = [];

            L.push('Aşağıda vereceğim MMPI-2 test sonuçlarını, klinik psikolog gibi TANISAL KESİNLİK iddiasında bulunmadan, yalnızca profesyonel ön değerlendirme ve eğitsel yorum çerçevesinde analiz et.');
            L.push('');
            L.push('Analizini TÜRKÇE yap ve çok açık, anlaşılır bir dille yaz. Teknik terimleri kullandığında mutlaka sade şekilde açıkla.');
            L.push('');
            L.push('Lütfen şu kurallara uy:');
            L.push('1. Kesin tanı koyma.');
            L.push('2. Sonuçların tek başına yeterli olmadığını, klinik görüşme ile birlikte değerlendirilmesi gerektiğini belirt.');
            L.push('3. Geçerlilik ölçeklerini mutlaka önce yorumla. Profil geçersiz, abartılı, savunmacı ya da tutarsız görünüyorsa bunu açıkça söyle.');
            L.push('4. Klinik ölçekleri tek tek açıkla. Alt ölçekleri de mutlaka değerlendir; ana ölçek puanının hangi bileşenlerden kaynaklandığını göster.');
            L.push('5. Sadece puanları yazmakla kalma; puanların olası anlamını, kişinin duygu-durum, düşünce yapısı, stres tepkileri, kişilerarası ilişkileri, benlik algısı, dürtü kontrolü, kaygı, depresif eğilimler, somatik yakınmalar ve günlük işlevsellik açısından yorumla.');
            L.push('6. Yüksek ve dikkat çekici kombinasyonları ayrıca değerlendir.');
            L.push('7. Olası risk alanlarını belirt: yoğun kaygı, depresif örüntü, öfke, şüphecilik, sosyal çekilme, bedenselleştirme, obsesif eğilimler, psikotik yaşantı olasılığı, dürtüsellik vb.');
            L.push('8. Sonucu dengeli yorumla: güçlü yönler, koruyucu faktörler ve işlevsel tarafları da yaz.');
            L.push('9. Yorumların sonunda mutlaka "bu sonuçlardan kesin çıkarılamayacak şeyler" diye ayrı bir bölüm aç.');
            L.push('10. Eğer verilerde intihar riski, kendine zarar verme, ağır psikotik belirti, gerçeklik değerlendirmesinde ciddi bozulma veya acil klinik risk düşündüren bir tablo varsa bunu net şekilde belirt ve profesyonel destek öner.');
            L.push('11. İçerik alt ölçekleri ve Harris-Lingoes alt ölçeklerini kullanarak ana ölçek yükselmelerinin kaynağını derinlemesine analiz et.');
            L.push('12. Kritik madde gruplarındaki onaylanma sayılarını değerlendir; özellikle intihar düşünceleri, psikotik belirtiler, madde kullanımı ve öfke alanlarına dikkat et.');
            L.push('');
            L.push('ÇIKTI FORMATI şu şekilde olsun:');
            L.push('');
            L.push('1) Kısa Genel Özet');
            L.push('2) Geçerlilik Değerlendirmesi');
            L.push('3) Klinik Ölçeklerin Ayrıntılı Yorumu (her ölçek + alt ölçekleri ayrı başlık)');
            L.push('4) RC Ölçeklerinin Yorumu');
            L.push('5) İçerik Ölçeklerinin Ayrıntılı Yorumu (her ölçek + alt ölçekleri)');
            L.push('6) Kod Tipi / Kombinasyon Analizi (en yüksek 2-3 yükselme)');
            L.push('7) Kişilik ve Psikolojik İşleyiş Profili (duygusal yapı, stres, savunma, ilişkiler, benlik, öfke, gerçeklik değerlendirmesi, sosyal uyum)');
            L.push('8) Ek Ölçekler ve PSY-5 Değerlendirmesi');
            L.push('9) Kritik Madde Analizi');
            L.push('10) Olası Klinik Temalar (kaygı, depresyon, somatizasyon, obsesif, paranoid, düşünce dağınıklığı, dürtüsellik, travma ipuçları — olasılık diliyle)');
            L.push('11) Güçlü Yönler ve Koruyucu Faktörler');
            L.push('12) Dikkat Edilmesi Gereken Riskler');
            L.push('13) Bu Sonuçlardan Kesin Çıkarılamayacak Şeyler');
            L.push('14) Sonuç ve Öneri');
            L.push('');
            L.push('Her klinik ölçek başlığı altında: puanın olası anlamı, alt ölçek katkıları, düşünce/duygu/davranış/ilişki örüntüsüne etkisi ve günlük yaşama muhtemel yansıması yer alsın.');
            L.push('');
            L.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            L.push('Şimdi aşağıdaki verileri analiz et:');
            L.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            L.push('');
            L.push('Cinsiyet: ' + (vm.gender === 'male' ? 'Erkek' : 'Kadın'));
            L.push('Test Tarihi: ' + (vm.reportDate || 'Belirtilmemiş'));
            L.push('Yanıtlanan Soru: ' + Object.keys(vm.answers).length + '/567');
            L.push('');

            // ── Geçerlilik ──
            L.push('═══ GEÇERLİLİK ÖLÇEKLERİ ═══');
            L.push('VRIN (Değişken Tepki Tutarsızlığı) = ' + s('VRIN'));
            L.push('TRIN (Doğru Tepki Tutarsızlığı)    = ' + s('TRIN'));
            L.push('F    (Seyreklik)                   = ' + s('F'));
            L.push('Fb   (Arka F)                      = ' + s('Fb'));
            L.push('Fp   (Seyreklik-Psikopatoloji)     = ' + s('Fp'));
            L.push('FBS  (Kötü Gösterim Ölçeği)        = ' + s('FBS'));
            L.push('L    (Yalan / Nadir Erdemler)       = ' + s('L'));
            L.push('K    (Düzeltme)                    = ' + s('K'));
            L.push('S    (Üstün Kendini Sunma)          = ' + s('S'));
            L.push('');

            // ── Klinik Ölçekler + Harris-Lingoes Alt Ölçekleri ──
            L.push('═══ KLİNİK ÖLÇEKLER VE ALT ÖLÇEKLERİ ═══');
            L.push('');
            L.push('── Hs (1 - Hipokondriazis) = ' + s('Hs'));
            L.push('');

            L.push('── D (2 - Depresyon) = ' + s('D'));
            L.push('   D-O  (Belirgin)              = ' + s('D-O'));
            L.push('   D-S  (Örtük)                 = ' + s('D-S'));
            L.push('   D1   (Öznel Depresyon)        = ' + s('D1'));
            L.push('   D2   (Psikomotor Yavaşlama)   = ' + s('D2'));
            L.push('   D3   (Fiziksel İşlev Boz.)    = ' + s('D3'));
            L.push('   D4   (Zihinsel Durgunluk)      = ' + s('D4'));
            L.push('   D5   (Ruminasyon)             = ' + s('D5'));
            L.push('');

            L.push('── Hy (3 - Histeri) = ' + s('Hy'));
            L.push('   Hy-O (Belirgin)              = ' + s('Hy-O'));
            L.push('   Hy-S (Örtük)                 = ' + s('Hy-S'));
            L.push('   Hy1  (Sosyal Kaygının İnkarı) = ' + s('Hy1'));
            L.push('   Hy2  (Sevgi İhtiyacı)         = ' + s('Hy2'));
            L.push('   Hy3  (Halsizlik-Kırgınlık)    = ' + s('Hy3'));
            L.push('   Hy4  (Somatik Yakınmalar)     = ' + s('Hy4'));
            L.push('   Hy5  (Saldırganlığın Bast.)   = ' + s('Hy5'));
            L.push('');

            L.push('── Pd (4 - Psikopatik Sapma) = ' + s('Pd'));
            L.push('   Pd-O (Belirgin)              = ' + s('Pd-O'));
            L.push('   Pd-S (Örtük)                 = ' + s('Pd-S'));
            L.push('   Pd1  (Ailevi Uyumsuzluk)      = ' + s('Pd1'));
            L.push('   Pd2  (Otorite Sorunları)       = ' + s('Pd2'));
            L.push('   Pd3  (Sosyal Rahatlık)         = ' + s('Pd3'));
            L.push('   Pd4  (Sosyal Yabancılaşma)     = ' + s('Pd4'));
            L.push('   Pd5  (Kendine Yabancılaşma)    = ' + s('Pd5'));
            L.push('');

            L.push('── Mf (5 - Erkeksilik-Kadınsılık) = ' + s('Mf'));
            L.push('');

            L.push('── Pa (6 - Paranoya) = ' + s('Pa'));
            L.push('   Pa-O (Belirgin)              = ' + s('Pa-O'));
            L.push('   Pa-S (Örtük)                 = ' + s('Pa-S'));
            L.push('   Pa1  (Kötülük Görme Düş.)     = ' + s('Pa1'));
            L.push('   Pa2  (Duyarlılık)             = ' + s('Pa2'));
            L.push('   Pa3  (Saflık)                 = ' + s('Pa3'));
            L.push('');

            L.push('── Pt (7 - Psikasteni) = ' + s('Pt'));
            L.push('');

            L.push('── Sc (8 - Şizofreni) = ' + s('Sc'));
            L.push('   Sc1  (Sosyal Yabancılaşma)     = ' + s('Sc1'));
            L.push('   Sc2  (Duygusal Yabancılaşma)   = ' + s('Sc2'));
            L.push('   Sc3  (Ego Hak. Bilişsel)       = ' + s('Sc3'));
            L.push('   Sc4  (Ego Hak. İradî)          = ' + s('Sc4'));
            L.push('   Sc5  (Ego Hak. Eksik Ketleme)  = ' + s('Sc5'));
            L.push('   Sc6  (Tuhaf Duyusal Yaşantılar)= ' + s('Sc6'));
            L.push('');

            L.push('── Ma (9 - Hipomani) = ' + s('Ma'));
            L.push('   Ma-O (Belirgin)              = ' + s('Ma-O'));
            L.push('   Ma-S (Örtük)                 = ' + s('Ma-S'));
            L.push('   Ma1  (Ahlaksızlık)            = ' + s('Ma1'));
            L.push('   Ma2  (Psikomotor Hızlanma)     = ' + s('Ma2'));
            L.push('   Ma3  (Sakinlik)               = ' + s('Ma3'));
            L.push('   Ma4  (Ego Şişkinliği)          = ' + s('Ma4'));
            L.push('');

            L.push('── Si (0 - Sosyal İçedönüklük) = ' + s('Si'));
            L.push('   Si1  (Utangaçlık/Öz-bilinç)   = ' + s('Si1'));
            L.push('   Si2  (Sosyal Kaçınma)          = ' + s('Si2'));
            L.push('   Si3  (Kendine/Başk. Yab.)      = ' + s('Si3'));
            L.push('');

            // ── RC Ölçekleri ──
            L.push('═══ RC ÖLÇEKLERİ (Yeniden Yapılandırılmış Klinik) ═══');
            L.push('RCd  (Demoralizasyon)                    = ' + s('dem'));
            L.push('RC1  (Somatik Yakınmalar)                = ' + s('som'));
            L.push('RC2  (Düşük Olumlu Duygular)             = ' + s('lpe'));
            L.push('RC3  (Sinizm)                            = ' + s('cyn'));
            L.push('RC4  (Antisosyal Davranış)               = ' + s('asb'));
            L.push('RC6  (Kötülük Görme Fikirleri)           = ' + s('per'));
            L.push('RC7  (İşlevsel Olmayan Negatif Duygular) = ' + s('dne'));
            L.push('RC8  (Sapkın Deneyimler)                 = ' + s('abx'));
            L.push('RC9  (Hipomanik Aktivasyon)              = ' + s('hpm'));
            L.push('');

            // ── İçerik Ölçekleri + Alt Ölçekleri ──
            L.push('═══ İÇERİK ÖLÇEKLERİ VE ALT ÖLÇEKLERİ ═══');
            L.push('');
            L.push('ANX  (Kaygı) = ' + s('ANX'));
            L.push('');

            L.push('FRS  (Korkular) = ' + s('FRS'));
            L.push('  FRS1 (Genel Korku)             = ' + s('FRS1'));
            L.push('  FRS2 (Çoklu Korkular)          = ' + s('FRS2'));
            L.push('');

            L.push('OBS  (Obsesiflik) = ' + s('OBS'));
            L.push('');

            L.push('DEP  (Depresyon) = ' + s('DEP'));
            L.push('  DEP1 (Dürtü Eksikliği)         = ' + s('DEP1'));
            L.push('  DEP2 (Disfori)                 = ' + s('DEP2'));
            L.push('  DEP3 (Kendini Küçümseme)        = ' + s('DEP3'));
            L.push('  DEP4 (İntihar Düşünceleri)      = ' + s('DEP4'));
            L.push('');

            L.push('HEA  (Sağlık Kaygıları) = ' + s('HEA'));
            L.push('  HEA1 (Gastrointestinal Belirt.) = ' + s('HEA1'));
            L.push('  HEA2 (Nörolojik Belirtiler)     = ' + s('HEA2'));
            L.push('  HEA3 (Genel Sağlık Kaygıları)   = ' + s('HEA3'));
            L.push('');

            L.push('BIZ  (Tuhaf Düşünce) = ' + s('BIZ'));
            L.push('  BIZ1 (Psikotik Semptomatoloji)  = ' + s('BIZ1'));
            L.push('  BIZ2 (Şizotipal Özellikler)     = ' + s('BIZ2'));
            L.push('');

            L.push('ANG  (Öfke) = ' + s('ANG'));
            L.push('  ANG1 (Patlamacı Davranış)       = ' + s('ANG1'));
            L.push('  ANG2 (Öfkelilik)               = ' + s('ANG2'));
            L.push('');

            L.push('CYN  (Sinizm) = ' + s('CYN'));
            L.push('  CYN1 (Misantropik İnançlar)     = ' + s('CYN1'));
            L.push('  CYN2 (Kişilerarası Kuşkuculuk)  = ' + s('CYN2'));
            L.push('');

            L.push('ASP  (Antisosyal Davranışlar) = ' + s('ASP'));
            L.push('  ASP1 (Antisosyal Tutumlar)      = ' + s('ASP1'));
            L.push('  ASP2 (Antisosyal Davranış)      = ' + s('ASP2'));
            L.push('');

            L.push('TPA  (A Tipi Davranış) = ' + s('TPA'));
            L.push('  TPA1 (Sabırsızlık)             = ' + s('TPA1'));
            L.push('  TPA2 (Rekabet Dürtüsü)          = ' + s('TPA2'));
            L.push('');

            L.push('LSE  (Düşük Özsaygı) = ' + s('LSE'));
            L.push('  LSE1 (Kendinden Kuşku)          = ' + s('LSE1'));
            L.push('  LSE2 (Boyun Eğicilik)           = ' + s('LSE2'));
            L.push('');

            L.push('SOD  (Sosyal Rahatsızlık) = ' + s('SOD'));
            L.push('  SOD1 (İçedönüklük)             = ' + s('SOD1'));
            L.push('  SOD2 (Utangaçlık)              = ' + s('SOD2'));
            L.push('');

            L.push('FAM  (Aile Sorunları) = ' + s('FAM'));
            L.push('  FAM1 (Aile İçi Geçimsizlik)     = ' + s('FAM1'));
            L.push('  FAM2 (Ailevi Yabancılaşma)      = ' + s('FAM2'));
            L.push('');

            L.push('WRK  (İş Bozuklukları) = ' + s('WRK'));
            L.push('');

            L.push('TRT  (Olumsuz Tedavi Göstergeleri) = ' + s('TRT'));
            L.push('  TRT1 (Düşük Motivasyon)         = ' + s('TRT1'));
            L.push('  TRT2 (Açıklayamama)             = ' + s('TRT2'));
            L.push('');

            // ── Ek Ölçekler ──
            L.push('═══ EK ÖLÇEKLER ═══');
            L.push('');
            L.push('─ Genel Duygusal Sıkıntı:');
            L.push('  A    (Kaygı)                    = ' + s('A'));
            L.push('  Mt   (Üniversite Uyumsuzluğu)   = ' + s('Mt'));
            L.push('  PK   (Keane TSSB)               = ' + s('PK'));
            L.push('  PS   (Schlenger TSSB)            = ' + s('PS'));
            L.push('  MDS  (Evlilik Sıkıntısı)        = ' + s('MDS'));
            L.push('');
            L.push('─ Geniş Kişilik Özellikleri:');
            L.push('  R    (Bastırma)                 = ' + s('R'));
            L.push('  Es   (Ego Gücü)                 = ' + s('Es'));
            L.push('  Do   (Baskınlık)                = ' + s('Do'));
            L.push('  Re   (Sosyal Sorumluluk)         = ' + s('Re'));
            L.push('');
            L.push('─ Davranış Kontrolsüzlüğü:');
            L.push('  Ho   (Düşmanlık)                = ' + s('Ho'));
            L.push('  O-H  (Aşırı Kontrollü Düşm.)    = ' + s('O-H'));
            L.push('  MAC-R (MacAndrew Alkolizm-R)     = ' + s('MAC-R'));
            L.push('  AAS  (Bağımlılık Kabulü)         = ' + s('AAS'));
            L.push('  APS  (Bağımlılık Potansiyeli)    = ' + s('APS'));
            L.push('');
            L.push('─ Cinsiyet Rolü:');
            L.push('  GM   (Erkeksi Cinsiyet Rolü)     = ' + s('GM'));
            L.push('  GF   (Kadınsı Cinsiyet Rolü)     = ' + s('GF'));
            L.push('');

            // ── PSY-5 ──
            L.push('═══ PSY-5 ÖLÇEKLERİ ═══');
            L.push('AGGR (Saldırganlık)              = ' + s('AGGR'));
            L.push('PSYC (Psikotisizm)               = ' + s('PSYC'));
            L.push('DISC (Kısıtlamasızlık)           = ' + s('DISC'));
            L.push('NEGE (Olumsuz Duygusallık)        = ' + s('NEGE'));
            L.push('INTR (İçedönüklük)               = ' + s('INTR'));
            L.push('');

            // ── Kritik Maddeler ──
            L.push('═══ KRİTİK MADDELER (Onaylanan Madde Sayısı / Toplam) ═══');
            L.push('Not: Bunlar T-skoru değil, onaylanan kritik madde sayısıdır.');
            L.push('');
            L.push('─ Koss-Butcher Kritik Maddeleri:');
            L.push('  KB1 (Akut Kaygı)               = ' + s('KB1') + '/17');
            L.push('  KB2 (Depresif İntihar Düş.)    = ' + s('KB2') + '/22');
            L.push('  KB3 (Tehdit Edici Saldırı)      = ' + s('KB3') + '/5');
            L.push('  KB4 (Alkolizm Durumsal Stres)   = ' + s('KB4') + '/7');
            L.push('  KB5 (Zihinsel Karışıklık)       = ' + s('KB5') + '/11');
            L.push('  KB6 (Kötülük Görme Düşünceleri)  = ' + s('KB6') + '/16');
            L.push('');
            L.push('─ Lachar-Wrobel Kritik Maddeleri:');
            L.push('  LW1  (Kaygı ve Gerginlik)       = ' + s('LW1') + '/11');
            L.push('  LW2  (Depresyon ve Endişe)       = ' + s('LW2') + '/16');
            L.push('  LW3  (Uyku Bozukluğu)           = ' + s('LW3') + '/6');
            L.push('  LW4  (Sapkın İnançlar)           = ' + s('LW4') + '/14');
            L.push('  LW5  (Sapkın Düşünce/Deneyim)    = ' + s('LW5') + '/10');
            L.push('  LW6  (Madde Kullanımı)           = ' + s('LW6') + '/3');
            L.push('  LW7  (Antisosyal Tutum)          = ' + s('LW7') + '/9');
            L.push('  LW8  (Aile Çatışması)            = ' + s('LW8') + '/4');
            L.push('  LW9  (Sorunlu Öfke)              = ' + s('LW9') + '/4');
            L.push('  LW10 (Cinsel Kaygı/Sapma)        = ' + s('LW10') + '/6');
            L.push('  LW11 (Somatik Belirtiler)        = ' + s('LW11') + '/23');

            return L.join('\n');
        }
    }
});
