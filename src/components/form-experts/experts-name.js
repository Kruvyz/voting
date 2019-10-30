class ExpertsName {
    constructor(el) {
        this.$el = $(el);
        this.$button = this.$el.find('.js-form-expert-name-button');
        this.$input = this.$el.find('.js-form-expert-name-input');
    }

    init() {
        this.hide();
        this.initListeners();
    }

    reset() {
        this.$input.val('');
    }

    initListeners() {
        this.$button.on('click', () => {
            const name = this.$input.val();
            $(document).trigger('get-expert-name', name);
            this.hide();
        });

        $(document).on('show-popup', () => {
            this.reset();
            this.show();
        })
    }

    show() {
        this.$el.show();
    }

    hide() {
        this.$el.hide();
    }
}

export default ExpertsName;