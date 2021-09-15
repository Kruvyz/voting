import renderPug from './diagram.pug';
import { getCandidates, getExperts, getFromStorage } from '../../service/data';
import Diagram from './diagram/diagram';

class Diagrams {
    constructor(el) {
        this.$el = $(el);
        this.candidatesData = [];
        this.expertsData = [];        
        this.$winner = this.$el.find('.js-winner');
    }

    init() {
        if (!this.$el.length) return;

        this.getData().then(() => {
            this.getMarks();
            this.candidatesData.sort(compare);
            this.show(this.candidatesData, this.expertsData.length);
        });
    }

    show(data, countExperts) {
        for (let i = 0; i < data.length; i++) {
            this.$el.append(renderPug);
        }

        this.$el.find('.js-diagram').each((index, element) => {
            let diagram = new Diagram(element, data[index], countExperts);
            diagram.init();
        });
    }

    async getData() {
        const { experts, candidates } = JSON.parse($('#data').text());
        
        this.candidatesData = candidates;
        this.expertsData = experts;
    }

    getMarks() {
        this.candidatesData.forEach((element, index) => {
            const score = element.votes.reduce((acc, vote) => acc + vote.value * vote.votedExperts.length, 0);

            element.mark = Math.round((score / this.expertsData.length) * 1000) / 1000;
        });
    }
}

function compare(a, b) {
    if (b.mark === a.mark) {
        if (b.votes[0].votedExperts.length === a.votes[0].votedExperts.length) {
            return a.votes[1].votedExperts.length - b.votes[1].votedExperts.length;
        } else {
            return a.votes[0].votedExperts.length - b.votes[0].votedExperts.length;
        }
    }

    return b.mark - a.mark;
}

export default Diagrams;