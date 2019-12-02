import { getCandidates, getExperts } from '../../service/data';

class Winner {
    constructor(el) {
        this.$el = $(el);
        this.candidatesData = [];
        this.expertsData = [];    
    }

    init() {
        if (!this.$el.length) return;
        
        this.getData();
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

        this.$el.html(`<span class="font-color-5">Найкраща альтернатива:</span> ${this.candidatesData[winner].name}`);
    }

    getData() {
        const data = JSON.parse($('#data').text());
        
        this.candidatesData = data.candidates;
        this.expertsData = data.experts;
    }
}

export default Winner;