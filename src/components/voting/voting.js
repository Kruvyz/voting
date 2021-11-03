import { addCandidate, addExpert, getVote, updateVote, getFromStorage, setToStorage, getUserLoginById } from '../../service/data';

class Voting {
    constructor(el) {
      this.$el = $(el);
      this.$votingCards = this.$el.find('.js-voting-cards');
      this.$votingExpert = $('.js-voting-expert-name');
      this.candidates = [];
      this.currentExpert = {votes: {}};
      this.$buttons = $('.js-navigate-buttons');
      this.experts = [];
      this.voteId = this.$el.data('id');
    }
  
    init() {
      if (!this.$el.length) return;
      
      this.$buttons.hide();
      this.hide();      
      
      this.getData().then(() => {
        this.initListeners();
        this.render();
        this.show();
      })
    }
  
    render() {
      this.$votingExpert.html("Експерт: " + this.currentExpert.name);

      this.candidates.forEach((element, index) => {
        const id = element.name + index;
        this.$votingCards.append(`
          <div class="voting__card">
            <p class="voting__card-title" title="${element.name}">${element.name}</p>
            <div class="voting__card-form">
            ${element.votes.map(vote => `
              <div class="voting__card-item">
                <input id="${"vote-" + index + '-' + vote.id}" type="radio" value="${vote.value}" name="${element.name + '-' + index}"/>
                <label for="${"vote-" + index + '-' + vote.id}">${vote.name}</label>
              </div>
            `).join('')}
            </form>
          </div>
        `);
      });
    }
  
    initListeners() {
      this.$el.on('submit', e => {
        e.preventDefault();

        this.getVotes();
        this.hide();

        updateVote({
          id: this.voteId,
          candidates: this.candidates,
          experts: this.experts,
          date: (new Date()).toLocaleString('uk', { dateStyle: 'long', timeStyle: 'short' })
        });

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
        let value = this.$votingCards.find(`input[name="${this.candidates[i].name + '-' + i}"]:checked`).val();
        this.candidates[i].votes.find(vote => vote.value === +value).votedExperts.push(this.currentExpert.name);
        this.currentExpert.votes[this.candidates[i].name] = value;
      }

      this.experts.push(this.currentExpert);
    }

    async getData() {
      const { candidates, experts } = await getVote(this.voteId) || [];
      
      this.currentExpert.name = await getUserLoginById(localStorage.getItem('userId'));

      this.candidates = candidates;
      this.experts = experts;
    }
  }

  export default Voting;