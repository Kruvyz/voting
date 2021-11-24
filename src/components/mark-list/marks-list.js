import marksInfo from '../form-candidates/marks-info.pug';
import './mark-list.sass';

class MarkList {
    constructor(el) {
      this.$el = $(el);

    }
  
    init() {
      if (!this.$el.length) return;
      
      this.getData();
      this.renderMarks(); 
    }


    renderMarks() {
        this.votes.forEach(mark => {
        this.$el.append(marksInfo({mark}))
      });
    }

    getData() {
        const { candidates } = JSON.parse($('#data').text());
        
        this.votes = candidates[0].votes;
    };
  }

  export default MarkList;