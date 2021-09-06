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
            let score = 0;

            for (let i in element.votes) {
                score += i * element.votes[i].length;
            }

            element.mark = Math.round((score / this.expertsData.length) * 1000) / 1000;
        });
    }
}

function compare(a, b) {
    if (b.mark === a.mark) {
        if (b.votes[-2].length === a.votes[-2].length) {
            return a.votes[-1].length - b.votes[-1].length;
        } else {
            return a.votes[-2].length - b.votes[-2].length;
        }
    }

    return b.mark - a.mark;
}

export default Diagrams;