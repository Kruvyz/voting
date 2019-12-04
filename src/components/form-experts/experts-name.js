import { getFromStorage } from '../../service/data';

class ExpertsName {
    constructor(el) {
        this.$el = $(el);
        this.$button = this.$el.find('.js-form-expert-name-button');
        this.$input = this.$el.find('.js-form-expert-name-input');
        this.experts = getFromStorage('experts') || [];
    }

    init() {
        if (!this.$el.length) return;
        
        this.setName();
        this.initListeners();
    }

    setName() {
            const dataValue = this.experts.length;
            const value = (dataValue + 1) / 10 >= 1 ? dataValue + 1 : '0' + (dataValue + 1);
            this.$input.val(value);
    }

    initListeners() {
        this.$el.on('submit', (e) => {
            e.preventDefault();
            
            const name = this.$input.val();
            $(document).trigger('get-expert-name', name);
            this.hide();
        });
    }

    show() {
        this.$el.show();
    }

    hide() {
        this.$el.hide();
    }
}

export default ExpertsName;