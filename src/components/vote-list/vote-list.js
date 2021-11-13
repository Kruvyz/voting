import { deleteExpertise } from '../../service/data';
import SETTINGS from './settings';

class VoteList {
    constructor(el) {
        this.$el = $(el);
    }

    init() {
        const userId = localStorage.getItem('userId');

        this.$el.find(SETTINGS.SELECTOR.BUTTON).each((i, element) => {
            const $btn = $(element);
            const createdBy = $btn.data('created-by');
            
            if (createdBy === userId) {
                $btn.show();
            }
        });

        this.initListeners();
    }

    initListeners() {
        this.$el.find(SETTINGS.SELECTOR.BUTTON).on('click', event => {
            deleteExpertise(event.target.dataset.id).then(() => {
                location.reload();
            });
        });
    }
}

export default VoteList;