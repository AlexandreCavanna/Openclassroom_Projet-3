const JCDecauxApi = {

    key: '6a44c41c86a1d2eb545763e7342cca6867d25c75',
    contract: 'lyon',
    createUrl: function(url) {

        if (this.key === null|| this.key === '') {

            console.error('JCDecaux API : la clé n\'est pas bonne ou non défini ');
            return;
        }

        if (this.contract === null|| this.contract === '') {

            console.error('JCDecaux API : contract n\'est pas défini.');
            return;
        }

        if (url === null || url === '') {

            console.error('JCDecaux API : url n\'est pas défini.');
            return;
        }

        return url + this.contract + '&apiKey=' + this.key;
    }
};
