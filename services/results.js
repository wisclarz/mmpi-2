var ResultsService = {
    saveResult: function (data) {
        return db.collection('test_results').add({
            name: data.name || 'İsimsiz',
            gender: data.gender || 'male',
            answers: data.answers,
            scores: data.scores,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            status: 'completed',
            version: '1.0'
        });
    },

    getResult: function (id) {
        return db.collection('test_results').doc(id).get();
    },

    getAllResults: function (limitCount) {
        return db.collection('test_results')
            .orderBy('createdAt', 'desc')
            .limit(limitCount || 100)
            .get();
    }
};
