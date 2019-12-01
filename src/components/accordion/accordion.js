class Accordion {
    constructor(el) {
        this.$el = $(el);
        this.$title = this.$el.find('.accordion__title');
        this.$content = this.$el.find('.accordion__content');        
    }

    init() {
        this.$content.hide();

        this.$title.on('click', () => {
            this.$content.slideToggle();
        });
    }
}

export default Accordion;