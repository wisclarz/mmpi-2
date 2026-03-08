var ScoringService = {
    calculateTScore: function (rawScore, scale, gender, scores) {
        var tScores = scale.tScores ? scale.tScores[gender] : null;
        if (!tScores) return rawScore;

        if (scale.kCorrection) {
            rawScore = Math.floor((scores["K"] || 0) * scale.kCorrection + rawScore + 0.5);
        }
        if (scale.scoreOffsets && scale.scoreOffsets[gender]) {
            rawScore -= scale.scoreOffsets[gender];
        }
        return tScores[Math.max(0, Math.min(rawScore, tScores.length - 1))];
    },

    gradeScale: function (scale, answers, gender, scores) {
        if (scale.gender && scale.gender !== gender) return;

        var rawScore = scale.baseScore || 0;
        scale.answers.forEach(function (v) {
            if (v.length === 2) {
                if (answers[v[0]] === v[1]) rawScore++;
            } else if (v.length === 5) {
                if (answers[v[0]] === v[1] && answers[v[2]] === v[3]) rawScore += v[4];
            }
        });

        if (scale.subScales) {
            scale.subScales.forEach(function (sub) {
                ScoringService.gradeScale(sub, answers, gender, scores);
            });
        }

        if (scale.tScores) {
            scores[scale.name] = ScoringService.calculateTScore(rawScore, scale, gender, scores);
        } else {
            scores[scale.name] = rawScore;
        }
    },

    gradeAll: function (scaleCategories, answers, gender) {
        var scores = {};
        scaleCategories.forEach(function (category) {
            category.items.forEach(function (item) {
                ScoringService.gradeScale(item, answers, gender, scores);
            });
        });
        return scores;
    },

    loadScalesAndGrade: function (answers, gender, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'data/scales.json', true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                var scaleCategories = JSON.parse(xhr.responseText);
                var scores = ScoringService.gradeAll(scaleCategories, answers, gender);
                callback(scores, scaleCategories);
            } else {
                callback(null, null);
            }
        };
        xhr.onerror = function () {
            callback(null, null);
        };
        xhr.send();
    }
};
