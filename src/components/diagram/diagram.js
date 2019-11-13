import renderPug from './diagram.pug';

class Diagram {
    constructor(el) {
        this.$el = $(el);
        this.candidatesData = JSON.parse(localStorage.getItem('candidates'));
        this.expertsData = JSON.parse(localStorage.getItem('experts'));        
        this.$winner = this.$el.find('.js-winner');
    }

    init() {
        this.show(this.candidatesData, this.expertsData.length);
    }

    show(data, countExperts) {
        for (let i = 0; i < data.length; i++) {
            this.$el.append(renderPug);
        }

        this.$el.find('.js-diagram').each((index, element) => {
            $(element).children().each((i, e) => {
                let width = (data[index].votes[5 - i].length / countExperts) * 200;
                let ident = 200 - width / 2;
                let $value = $(e).find('.diagram-block__value');

                if (i == 2) $(e).css('left', ident); 
                $(e).width(width ? width : 0);

                $value.html(data[index].votes[5 - i].length);                                 

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
}

export default Diagram;