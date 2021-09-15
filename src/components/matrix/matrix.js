import { getExperts, getCandidates, getFromStorage } from '../../service/data';

class Matrix {
    constructor(el) {
        this.$el = $(el);
        this.matrix = [];
        this.candidates = [];
    }

    init() {
        if (!this.$el.length) return;
        
        this.getData().then(() => {
            this.render();
        });
    }

    render() {
        const tableHeader = $(document.createElement('tr'));
        tableHeader.addClass('matrix__head');
        tableHeader.append(`<td></td>`);

        this.candidates.forEach(element => {
            tableHeader.append(`<td title="${element.name}"><p>${element.name}</p></td>`);           
        }); 
        this.$el.append(tableHeader);

        this.matrix.forEach((element, index) => {
            const emptyRow = $(document.createElement('tr'));
            emptyRow.addClass('matrix__empty-row');

            let row =  $(document.createElement('tr'));
            row.append(`<td class="matrix__name" title="${element.name}"><p>${element.name}</p></td>`);           
            
            this.candidates.forEach(canditate => {
                const colorId = canditate.votes.find(vote => +vote.value === +element.votes[canditate.name]).id;
                row.append(`<td class="color-${colorId} colors"></td>`);
            });

            this.$el.append(row);
            this.$el.append(emptyRow);
        });
    }

    async getData() {
        const { experts, candidates } = JSON.parse($('#data').text());

        this.candidates = candidates;
        this.matrix = experts;
    }
}

export default Matrix;