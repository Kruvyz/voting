import { getFromStorage } from '../../service/data';

export function RenderText() {
    const experts = getFromStorage('experts');
    const candidates = getFromStorage('candidates');
    const name = getFromStorage('name');

    $('.js-voting-name').text(`Резельтати колективної експертизи: ${name}`);
    $('.js-candidates-count').text(`Кількість оцінюваних альтернатив: ${candidates.length}`);
    $('.js-experts-count').text(`Загальна кількість експертів: ${experts.length}`);    
}