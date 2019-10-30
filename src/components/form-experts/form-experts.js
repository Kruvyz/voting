class FormExperts {
    constructor(el) {
      this.$el = $(el);
    }
  
    init() {
      this.initListeners();
      this.hide();
    }

    initListeners() {
      $(".js-form-experts-button").on('click', () => {
        const count = +$('.js-form-experts-input').val();
  
        this.hide();
        $(document).trigger('voting-show', count);
      });
  
      $(document).on('form-experts-show', () => {
        this.show();
      })
    }
  
    hide() {
      this.$el.hide();
    }
  
    show() {
      this.$el.show();
    }
  }

  export default FormExperts;