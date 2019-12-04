import renderPug from './diagram.pug';
import { getCandidates, getExperts, getFromStorage } from '../../service/data';

class Diagram {
    constructor(el) {
        this.$el = $(el);
        this.candidatesData = [];
        this.expertsData = [];        
        this.$winner = this.$el.find('.js-winner');
    }

    init() {
        if (!this.$el.length) return;

        this.getData().then(() => {
            this.candidatesData.sort(compare);
            this.show(this.candidatesData, this.expertsData.length);
        });
    }

    show(data, countExperts) {
        const elementWidth = this.$el.width() / 2;

        for (let i = 0; i < data.length; i++) {
            this.$el.append(renderPug);
        }

        this.$el.find('.js-diagram').each((index, element) => {
            $(element).children().each((i, e) => {
                let width = (data[index].votes[2 - i].length / countExperts) * elementWidth;
                let ident = elementWidth - width / 2;
                let $value = $(e).find('.diagram-block__value');

                if (i == 2) $(e).css('left', ident); 
                $(e).width(width ? width : 0);

                $value.html(data[index].votes[2 - i].length);                                 

                if (i < 2) {
                    $value.css('right', -15);
                } else if (i === 2) {
                    $value.css({
                        'left': '50%',
                        'transform': 'translate(-50%, -50%)'
                    });                    
                } else {
                    $value.css('left', -15);                    
                }
                
            });
        });

        this.$el.find('.js-name').each((i , e) => {
            e.innerHTML = 'Альтернатива: ' + this.candidatesData[i].name;
        });
    }

    async getData() {
        this.candidatesData = await getFromStorage('candidates') || [];
        this.expertsData = await getFromStorage('experts') || [];
    }

    getMarks() {
        this.candidatesData.forEach((element, index) => {
            let score = 0;

            for (let i in element.votes) {
                score += i * element.votes[i].length;
            }

            this.candidatesData.mark = Math.round((score / this.expertsData.length) * 1000) / 1000;
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

export default Diagram;