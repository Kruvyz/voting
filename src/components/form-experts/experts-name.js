class ExpertsName {
    constructor(el) {
        this.$el = $(el);
        this.$button = this.$el.find('.js-form-expert-name-button');
        this.$input = this.$el.find('.js-form-expert-name-input');
        this.id = window.location.pathname.split('/')[2];
    }

    init() {
        if (!this.$el.length) return;
        
        this.setName();
        this.initListeners();
    }

    setName() {
        fetch(`/voting-expert/${this.id}`, { method: 'get' })
            .then(response => response.json())
            .then(data => {
                const value = (data.value + 1) / 10 >= 1 ? (data.value + 1) : '0' + (data.value + 1);
                this.$input.val(value);
        });
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