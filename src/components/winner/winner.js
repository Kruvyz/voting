class Winner {
    constructor(el) {
        this.$el = $(el);
        this.candidatesData = [];
        this.expertsData = [];   
    }

    init() {
        if (!this.$el.length) return;

        this.candidatesData = JSON.parse($('#data').text()).candidates;
        this.expertsData = JSON.parse($('#data').text()).experts; 

        this.findWinner();
    }

    findWinner() {
        let winner = 0;
        let maxScore = 0;        

        this.candidatesData.forEach((element, index) => {
            let score = 0;

            for (let i in element.votes) {
                score += i * element.votes[i].length;
            }

            if(score / this.expertsData.length > maxScore ) {
                winner = index;
                maxScore = score / this.expertsData.length;
            }
        });

        this.$el.html("Перемога: " + this.candidatesData[winner].name);
    }
}

export default Winner;