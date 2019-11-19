import { FORM_CANDIDATES_SETTINGS as SETTINGS } from './settings';
import renderForm from './form-candidates.pug';

class FormCandidates {
    constructor(el) {
      this.$el = $(el);
    }
  
    init() {
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
              <input id=${i} class="form-candidates__name-input ${SETTINGS.SELECTOR.INPUT_NAME}" type="text" required maxlength="50">
            </div>
            `);
        }
        
        $(`.${SETTINGS.SELECTOR.CONFIRM_BUTTON}`).show();
      });
      
      $(`.js-name-list`).on('submit', (e) => {
        e.preventDefault();
        const $names = $(`.${SETTINGS.SELECTOR.INPUT_NAME}`);
        window.candidates = [];
    
        $names.each((index, element) => {
          window.candidates.push({ 
            name: element.value,
            votes: {
              "1": [],
              "2": [],
              "3": [],
              "4": [],
              "5": [] 
            }
           });
        });
  
        this.hide();
        $(document).trigger('form-experts-show');
      });

      $(document).on('create-candidates', () => {
        this.$el.show();
      });
    }
  }

  export default FormCandidates;