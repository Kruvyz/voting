import { DIAGRAM_TYPES, DIAGRAM_TYPE_NAMES } from './diagram-types';

const MiN_SIZE_ROW_BLOCK = 15;

class Diagram {
    constructor(el, candidatesData, countExperts) {
        this.$el = $(el);
        this.$body = this.$el.find('.js-diagram-body');
        this.candidatesData = candidatesData;
        this.countExperts = countExperts;
        this.selectedType = DIAGRAM_TYPES.ROW;
    }

    init() {
        if (!this.$el.length) return;

        this.renderDiagram();
        this.renderSelectOptions();
    }

    renderDiagram() {
        this.applyClasses();
        this.$el.find('.js-name').text('Альтернатива: ' + this.candidatesData.name);

        if (this.selectedType === DIAGRAM_TYPES.DUPLEX) {
            this.renderDuplex();
        }

        if (this.selectedType === DIAGRAM_TYPES.ROW) {
            this.renderRow();
        }        
    }

    renderSelectOptions() {
        const $select = this.$el.find('.js-diagram-types');
        
        Object.values(DIAGRAM_TYPES).forEach(type => {
            $select.append($("<option>").attr('value', type).attr('selected', type === this.selectedType).text(DIAGRAM_TYPE_NAMES[type]));
        });

        $select.on('change', event => {
            this.selectedType = event.target.value;
            this.renderDiagram();
        });
    }

    applyClasses() {
        this.$el.toggleClass('diagram--duplex', this.selectedType === DIAGRAM_TYPES.DUPLEX);
        this.$el.toggleClass('diagram--row', this.selectedType === DIAGRAM_TYPES.ROW);
    }

    renderDuplex() {
        const elementWidth = this.$el.width() / 2;
        const lenght = this.candidatesData.votes.length;

        this.$body.height(lenght * 30);

        this.$body.find('.js-diagram-block').each((i, e) => {
            const vote = this.candidatesData.votes[this.candidatesData.votes.length - i - 1];
            let width = (vote.votedExperts.length / this.countExperts) * elementWidth;
            let $value = $(e).find('.diagram-block__value');

            $(e).width(width ? width : 0);
            $(e).css('background-color', this.candidatesData.votes[i].color); 
            $value.html(vote.votedExperts.length);
        });
    }

    renderRow() {
        const elementWidth = this.$el.width();

        this.candidatesData.votes.forEach(vote => {
            if (!vote.votedExperts.length) return;

            const $div = $(`<div class="js-diagram-block diagram-block"><div class="diagram-block__value">${vote.votedExperts.length}</div></div>`);

            let width = (vote.votedExperts.length / this.countExperts) * (elementWidth);

            $div.width(width ? width : MiN_SIZE_ROW_BLOCK);  
            $div.css('background-color', vote.color);      

            this.$body.append($div);
        });
    }
}

export default Diagram;