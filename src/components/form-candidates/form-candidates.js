import { FORM_CANDIDATES_SETTINGS as SETTINGS } from './settings';
import { addVote } from '../../service/data';
import renderForm from './form-candidates.pug';

const DEFAULT_MARKS = [
  { id: 1, value: -2, votedExperts: [], name: 'Категорично проти'},
  { id: 2, value: -1, votedExperts: [], name: 'Проти'},
  { id: 3, value: 0, votedExperts: [], name: 'Байдуже'},
  { id: 4, value: 1, votedExperts: [], name: 'За'},
  { id: 5, value: 2, votedExperts: [], name: 'Категорично за'}
];

class FormCandidates {
    constructor(el) {
      this.$el = $(el);
      this.$marksChangeList = this.$el.find(SETTINGS.SELECTOR.MARK_LIST);
      this.isMarksChanged = false;
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

        for (let i = 0; i < 5; i++) {
          this.$marksChangeList.append(`
            <div><input type="text" value="${DEFAULT_MARKS[i].name}" id="name-${i}"> <input type="number" value="${DEFAULT_MARKS[i].value}" id="value-${i}"></div>
          `)
        }

        $(SETTINGS.SELECTOR.MARK_LIST).show();
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

      for (let i = 0; i < 5; i++) {
        marks.push({
          name: this.$marksChangeList.find(`#name-${i}`).val(),
          value: +this.$marksChangeList.find(`#value-${i}`).val(),
          votedExperts: [],
          id: i + 1
        })
      }

      return marks;
    }
  }

  export default FormCandidates;