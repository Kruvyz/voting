import { FORM_CANDIDATES_SETTINGS as SETTINGS } from './settings';
import { addVote } from '../../service/data';
import renderForm from './form-candidates.pug';

class FormCandidates {
    constructor(el) {
      this.$el = $(el);
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
  
        if(value > 10 || value < 1) return;
    
        for (let i = 0; i < value; i++) {
          $div.append(`
            <div class="form-candidates__name-item">
              <label for=${i}>Альтернатива ${i + 1}</label>
              <input id=${i} class="form-candidates__name-input ${SETTINGS.SELECTOR.INPUT_NAME}" value="a${i + 1}" type="text" required maxlength="50">
            </div>
            `);
        }
        
        $(`.${SETTINGS.SELECTOR.CONFIRM_BUTTON}`).show();
      });
      
      $(`.js-name-list`).on('submit', (e) => {
        e.preventDefault();
        const $names = $(`.${SETTINGS.SELECTOR.INPUT_NAME}`);
        let candidates = [];
    
        $names.each((index, element) => {
          candidates.push({ 
            name: element.value,
            votes: {
              "-2": [],
              "-1": [],
              "0": [],
              "1": [],
              "2": [] 
            }
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
  }

  export default FormCandidates;