import markPug from './mark.pug';

class Marks {
    constructor(el) {
        this.$el = $(el);
        this.marks = [];
        this.candidatesData = [];
        this.expertsData = [];  
    }

    init() {
        if (!this.$el.length) return;
        
        this.candidatesData = JSON.parse($('#data').text()).candidates;
        this.expertsData = JSON.parse($('#data').text()).experts;

        this.getMarks();
        this.marks.sort((a, b) => b.mark - a.mark)
        this.render();
    }

    getMarks() {
        this.candidatesData.forEach((element, index) => {
            let score = 0;

            for (let i in element.votes) {
                score += i * element.votes[i].length;
            }

            this.marks.push({name: element.name, mark: score / this.expertsData.length});
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