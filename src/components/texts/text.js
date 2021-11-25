import { getFromStorage } from '../../service/data';

export function RenderText() {
    const { experts, candidates, name, date } = JSON.parse($('#data').text());

    $('.js-voting-name').text(name);
    $('.js-voting-data').text(date.replace('о ', ''));
    $('.js-candidates-count').text(`Кількість оцінюваних альтернатив: ${candidates.length}`);
    $('.js-experts-count').text(`Загальна кількість експертів: ${experts.length}`);    
}