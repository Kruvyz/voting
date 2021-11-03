import { FORM_CANDIDATES_SETTINGS as SETTINGS } from './settings';
import { addVote } from '../../service/data';
import renderForm from './form-candidates.pug';

const DEFAULT_MARKS = [
  { id: 1, value: -2, votedExperts: [], name: 'Категорично проти', color: '#ff0000'},
  { id: 2, value: -1, votedExperts: [], name: 'Проти', color: '#FF8270'},
  { id: 3, value: 0, votedExperts: [], name: 'Байдуже', color: '#FFFF2A'},
  { id: 4, value: 1, votedExperts: [], name: 'За', color: '#80FE5C'},
  { id: 5, value: 2, votedExperts: [], name: 'Категорично за', color: '#00D700'}
];

class FormCandidates {
    constructor(el) {
      this.$el = $(el);
      this.$marksChangeList = this.$el.find(SETTINGS.SELECTOR.MARK_LIST);
      this.isMarksChanged = false;
      this.lastMarkIndex = 0;
    }
  
    init() {
      if (!this.$el.length) return;
      
      this.hide();
      this.initListeners();      
    }
  
    hide() {
      this.$el.hide();
    }
  
    initListeners() {
      $(`.${SETTINGS.SELECTOR.BUTTON}`).on('click', event => {
        const value = $('.js-field-number').val();
        const $div = $('.js-name-list');
        $div.html('');
  
        if(value > 20 || value < 1) return;
    
        for (let i = 0; i < value; i++) {
          $div.append(`
            <div class="form-candidates__name-item">
              <label for=${i}>Альтернатива ${i + 1}</label>
              <input id=${i} class="form-candidates__name-input ${SETTINGS.SELECTOR.INPUT_NAME}" value="a${i + 1}" type="text" required maxlength="50">
            </div>
            `);
        }
        
        $(`.${SETTINGS.SELECTOR.CONFIRM_BUTTON}`).show();
        $(SETTINGS.SELECTOR.CHANGE_MARKS_BUTTON).show();
      });

      $(SETTINGS.SELECTOR.CHANGE_MARKS_BUTTON).on('click', () => {
        this.isMarksChanged = true;

        for (let i = 0; i < 2; i++) {
          this.$marksChangeList.append(`
            <div>
              <input type="text" value="${i}" id="name-${i}"/>
              <input type="number" value="${i}" id="value-${i}"/>
              <input type="color" id="color-${i}"/>
            </div>
          `);
          this.lastMarkIndex++;
        }

        $(SETTINGS.SELECTOR.MARK_LIST_CONTAINER).show();
      });

      
      $(SETTINGS.SELECTOR.ADD_MARK).on('click', () => {
          this.$marksChangeList.append(`
            <div>
              <input type="text" value="${this.lastMarkIndex}" id="name-${this.lastMarkIndex}"/>
              <input type="number" value="${this.lastMarkIndex}" id="value-${this.lastMarkIndex}"/>
              <input type="color" id="color-${this.lastMarkIndex}"/>
            </div>
          `);
          this.lastMarkIndex++;
      });

      $(SETTINGS.SELECTOR.DELETE_MARK).on('click', () => {
        if (this.lastMarkIndex <= 2) return;

        this.$marksChangeList.children().last().remove();;
        this.lastMarkIndex--;
    });
      
      $(`.js-name-list`).on('submit', (e) => {
        e.preventDefault();
        const $names = $(`.${SETTINGS.SELECTOR.INPUT_NAME}`);
        const votes = this.isMarksChanged ? this.getMarks() : [...DEFAULT_MARKS];
        let candidates = [];
    
        $names.each((index, element) => {
          candidates.push({ 
            name: element.value,
            votes
           });
        });
  
        this.hide();

        addVote({
          candidates,
          name: window.name
        }).then(id => {
          window.location.assign(`${window.location.origin}/vote/${id}`);
        });
        
      });

      $(document).on('create-candidates', () => {
        this.$el.show();
      })
    }

    getMarks() {
      let marks = [];

      for (let i = 0; i < this.lastMarkIndex; i++) {
        marks.push({
          name: this.$marksChangeList.find(`#name-${i}`).val(),
          value: +this.$marksChangeList.find(`#value-${i}`).val(),
          color: this.$marksChangeList.find(`#color-${i}`).val(),
          votedExperts: [],
          id: i + 1
        })
      }

      return marks;
    }
  }

  export default FormCandidates;