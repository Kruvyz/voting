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

        this.matrix.forEach(element => {
            const emptyRow = $(document.createElement('tr'));
            emptyRow.addClass('matrix__empty-row');

            let row =  $(document.createElement('tr'));
            row.append(`<td class="matrix__name" title="${element.name}"><p>${element.name}</p></td>`);           
            
            for (let i in element.votes) {
                row.append(`<td class="color-${+element.votes[i] + 3} colors"></td>`);           
            }
            this.$el.append(row);
            this.$el.append(emptyRow);
        });
    }

    async getData() {
        this.candidatesData = await getFromStorage('candidates') || [];
        this.matrix = await getFromStorage('experts') || [];
    }
}

export default Matrix;