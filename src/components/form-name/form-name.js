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
        this.$button.on('click', () => {
            window.name = this.$value.val();
            this.$el.hide();
            $(document).trigger('create-candidates');
        });
    }
}

export default FormName;