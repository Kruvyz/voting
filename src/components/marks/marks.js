import markPug from './mark.pug';

class Marks {
    constructor(el) {
        this.$el = $(el);
        this.marks = [];
        this.candidatesData = JSON.parse(localStorage.getItem('candidates'));
        this.expertsData = JSON.parse(localStorage.getItem('experts'));  
    }

    init() {
        this.getMarks();
        this.marks.sort(compare)
        this.render();
    }

    getMarks() {
        this.candidatesData.forEach((element, index) => {
            let score = 0;

            for (let i in element.votes) {
                score += i * element.votes[i].length;
            }

            this.marks.push({
                name: element.name,
                mark: Math.round((score / this.expertsData.length) * 10000) / 10000,
                votes: element.votes
            });
        });
    }

    render() {
        this.$el.html('');
        
        this.marks.forEach(element => {
            this.$el.append(markPug({ name: element.name, value: element.mark }))
        });
    }
}

export default Marks;

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