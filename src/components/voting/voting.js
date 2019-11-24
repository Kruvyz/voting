import ExpertName from '../form-experts/experts-name';

class Voting {
    constructor(el) {
      this.$el = $(el);
      this.$votingCards = this.$el.find('.js-voting-cards');
      this.$votingExpert = $('.js-voting-expert-name');
      this.expertName = new ExpertName('.js-form-expert-name');
      this.candidates = JSON.parse(localStorage.getItem('candidates'));
      this.currentExpert = {};
      this.experts = JSON.parse(localStorage.getItem('experts')) || [];
      this.$buttons = $('.js-navigate-buttons');
    }
  
    init() {
      if (!this.$el.length) return;
      
      this.$buttons.hide();
      this.initListeners();
      this.expertName.init();
      this.hide();
    }
  
    render() {
      $('.js-voting-expert-name').html("Експерт: " + this.currentExpert.name);

      this.candidates.forEach((element, index) => {
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
        .on('get-expert-name', (e, name) => {
          this.currentExpert = {name, votes: {}};           
          this.show();
          this.render();
        })

      this.$el.on('submit', e => {
        e.preventDefault();

        this.getVotes();
        this.hide();

        localStorage.setItem('candidates', JSON.stringify(this.candidates));
        localStorage.setItem('experts', JSON.stringify(this.experts));
        this.hide();
        this.$buttons.slideToggle();  
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
      let count = this.candidates.length;
      let values = [];

      for (let i = 0; i < count; i++) {
        let value = this.$votingCards.find(`input[name="${this.candidates[i].name + i}"]:checked`).val();
        this.candidates[i].votes[value].push(this.currentExpert.name);
        this.currentExpert.votes[this.candidates[i].name] = value;
      }

      this.experts.push(this.currentExpert);
    }
  }

  export default Voting;