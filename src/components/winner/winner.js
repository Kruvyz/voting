import { getCandidates, getExperts, setToStorage, getFromStorage } from '../../service/data';
import { RenderText } from '../texts/text';

class Winner {
    constructor(el) {
        this.$el = $(el);
        this.candidatesData = [];
        this.expertsData = [];    
    }

    init() {
        if (!this.$el.length) return;
        
        this.getData().then(() => {
            this.findWinner();
            RenderText();
        });
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

        this.$el.html(`Найкраща альтернатива: <span class="font-color-5">${this.candidatesData[winner].name}</span>`);
    }

    async getData() {
        this.candidatesData = await getFromStorage('candidates') || [];
        this.expertsData = await getFromStorage('experts') || [];
    }
}

export default Winner;