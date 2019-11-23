import ExpertName from '../form-experts/experts-name';

class Voting {
    constructor(el) {
      this.$el = $(el);
      this.$votingCards = this.$el.find('.js-voting-cards');
      this.$votingExpert = $('.js-voting-expert-name');
      this.expertName = new ExpertName('.js-form-expert-name');
      this.expertsCount = 0;
      this.currentVote = 0;
      this.experts = [];
    }
  
    init() {
      this.initListeners();
      this.expertName.init();
      this.hide();
    }
  
    render() {
      $('.js-voting-expert-name').html("Експерт: " + this.experts[this.currentVote].name);

      window.candidates.forEach((element, index) => {
        const id = element.name + index;
        this.$votingCards.append(`
          <div class="voting__card">
            <p class="voting__card-title" title="${element.name}">${element.name}</p>
            <div class="voting__card-form">
              <div class="voting__card-item">
                <input id="${"vote-first" + id}" type="radio" value="2" name="${id}"/>
                <label for="${"vote-first" + id}">Категорично за</label>
              </div>
  
              <div class="voting__card-item">
                <input id="${"vote-second" + id}" type="radio" value="1" name="${id}"/>
                <label for="${"vote-second" + id}">За</label>
              </div>
  
              <div class="voting__card-item">
                <input id="${"vote-third" + id}" type="radio" value="0" name="${id}" checked="checked"/>
                <label for="${"vote-third" + id}">Байдуже</label>
              </div>
  
              <div class="voting__card-item">
                <input id="${"vote-fourth" + id}" type="radio" value="-1" name="${id}"/>
                <label for="${"vote-fourth" + id}">Проти</label>
              </div>
  
              <div class="voting__card-item">
                <input id="${"vote-fifth" + id}" type="radio" value="-2" name="${id}"/>
                <label for="${"vote-fifth" + id}">Категорично проти</label>
              </div>
            </form>
          </div>
        `);
      });
    }
  
    initListeners() {
      $(document)
        .on('voting-show', (e, count) => {
          this.expertsCount = count;
          this.hide();
          $(document).trigger('show-popup');
        })
        .on('get-expert-name', (e, name) => {
          this.experts.push({name, votes: {}});           
          this.show();
          this.render();
        })
        .on('get-expert-name-show', () => {
          this.hide();
          $(document).trigger('show-popup');
        });

      this.$el.on('submit', e => {
        e.preventDefault();

        this.getVotes();
        this.$votingCards.html(''); 
        this.currentVote++;
        
        if (this.currentVote >= this.expertsCount) {
          this.hide();
          localStorage.setItem('candidates', JSON.stringify(window.candidates));
          localStorage.setItem('experts', JSON.stringify(this.experts));  
          window.location.assign(window.location.origin + '/result');        
     
          return;
        }

        $(document).trigger('get-expert-name-show');           
      });   
    }
  
    hide() {
      this.$el.hide();
      this.$votingExpert.hide();      
    }
  
    show() {
      this.$el.show();
      this.$votingExpert.show();      
    }

    getVotes() {
      let count = window.candidates.length;
      let values = [];

      for (let i = 0; i < count; i++) {
        let value = this.$votingCards.find(`input[name="${window.candidates[i].name + i}"]:checked`).val();
        window.candidates[i].votes[value].push(this.experts[this.currentVote].name);
        this.experts[this.currentVote].votes[window.candidates[i].name] = value;
      }
    }
  }

  export default Voting;