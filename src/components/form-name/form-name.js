import { setToStorage } from '../../service/data'

class FormName {
    constructor(el) {
        this.$el = $(el);
        this.$button = this.$el.find('.js-form-name-button');
        this.$value = this.$el.find('.js-form-name-value');
    }

    init() {
        this.initListeners();
    }

    initListeners() {
        this.$el.on('submit', e => {
            e.preventDefault();
            
            window.name = this.$value.val();
            setToStorage('name', window.name);
            this.$el.hide();
            $(document).trigger('create-candidates');
        });
    }
}

export default FormName;