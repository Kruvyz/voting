class Matrix {
    constructor(el) {
        this.$el = $(el);
        this.matrix = JSON.parse(localStorage.getItem('experts'));
        this.candidates = JSON.parse(localStorage.getItem('candidates'));
    }

    init() {
        this.render();
    }

    render() {
        const tableHeader = $(document.createElement('tr'));
        tableHeader.append(`<td class="matrix__name"></td>`);

        this.candidates.forEach(element => {
            tableHeader.append(`<td><p>${element.name}</p></td>`);           
        }); 
        this.$el.append(tableHeader);

        this.matrix.forEach(element => {
            let row =  $(document.createElement('tr'));
            row.append(`<td class="matrix__name">${element.name}</td>`);           
            
            for (let i in element.votes) {
                row.append(`<td class="color-${element.votes[i]} colors"></td>`);           
            }
            this.$el.append(row);
        });
    }
}

export default Matrix;