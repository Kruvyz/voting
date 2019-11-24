class Winner {
    constructor(el) {
        this.$el = $(el);
        this.candidatesData = JSON.parse(localStorage.getItem('candidates'));
        this.expertsData = JSON.parse(localStorage.getItem('experts'));    
    }

    init() {
        if (!this.$el.length) return;
        
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
}

export default Winner;