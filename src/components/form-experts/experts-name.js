class ExpertsName {
    constructor(el) {
        this.$el = $(el);
        this.$button = this.$el.find('.js-form-expert-name-button');
        this.$input = this.$el.find('.js-form-expert-name-input');
    }

    init() {
        if (!this.$el.length) return;
        
        fetch('/voting-expert', { method: 'post' });
        this.setName();
        this.initListeners();
    }

    setName() {
        fetch('/voting-expert', { method: 'get' })
            .then(response => response.json())
            .then(data => {
                const value = data.value / 10 > 1 ? data.value : '0' + data.value;
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