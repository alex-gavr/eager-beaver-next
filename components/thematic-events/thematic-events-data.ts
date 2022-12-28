import halloween from '../../images/thematicEvents/halloween/optimized/1.webp';
import halloween2 from '../../images/thematicEvents/halloween/optimized/2.webp';
import halloween3 from '../../images/thematicEvents/halloween/optimized/3.webp';
import halloween4 from '../../images/thematicEvents/halloween/optimized/4.webp';
import halloween5 from '../../images/thematicEvents/halloween/optimized/5.webp';
import halloween6 from '../../images/thematicEvents/halloween/optimized/6.webp';
import halloween7 from '../../images/thematicEvents/halloween/optimized/7.webp';
import halloween8 from '../../images/thematicEvents/halloween/optimized/8.webp';
import halloween9 from '../../images/thematicEvents/halloween/optimized/9.webp';
import halloween10 from '../../images/thematicEvents/halloween/optimized/10.webp';
import halloween11 from '../../images/thematicEvents/halloween/optimized/11.webp';
import halloween12 from '../../images/thematicEvents/halloween/optimized/12.webp';

import easter from '../../images/thematicEvents/easter/optimized/1.webp';
import easter2 from '../../images/thematicEvents/easter/optimized/2.webp';
import easter3 from '../../images/thematicEvents/easter/optimized/3.webp';
import easter4 from '../../images/thematicEvents/easter/optimized/4.webp';
import easter5 from '../../images/thematicEvents/easter/optimized/5.webp';
import easter6 from '../../images/thematicEvents/easter/optimized/6.webp';
import easter7 from '../../images/thematicEvents/easter/optimized/7.webp';



import sailor from '../../images/thematicEvents/sailor/optimized/1.webp';
import sailor2 from '../../images/thematicEvents/sailor/optimized/2.webp';
import sailor3 from '../../images/thematicEvents/sailor/optimized/3.webp';
import sailor4 from '../../images/thematicEvents/sailor/optimized/4.webp';
import sailor5 from '../../images/thematicEvents/sailor/optimized/5.webp';
import sailor6 from '../../images/thematicEvents/sailor/optimized/6.webp';
import sailor7 from '../../images/thematicEvents/sailor/optimized/7.webp';
import sailor8 from '../../images/thematicEvents/sailor/optimized/8.webp';
import sailor9 from '../../images/thematicEvents/sailor/optimized/9.webp';
import sailor10 from '../../images/thematicEvents/sailor/optimized/10.webp';



import christmas from '../../images/thematicEvents/christmas/optimized/1.webp';
import christmas2 from '../../images/thematicEvents/christmas/optimized/2.webp';
import christmas3 from '../../images/thematicEvents/christmas/optimized/3.webp';
import christmas4 from '../../images/thematicEvents/christmas/optimized/4.webp';
import christmas5 from '../../images/thematicEvents/christmas/optimized/5.webp';



interface Image {
    image: any;
}
export interface IEventsData {
    id: number;
    images: Image[];
    imageSide: 'left' | 'right';
    subHeading: string;
    paragraph: string;
}

export const eventsData: IEventsData[] = [
    {
        id: 1,
        images: [
            {
                image: halloween,
            },
            {
                image: halloween2,
            },
            {
                image: halloween3,
            },
            {
                image: halloween4,
            },
            {
                image: halloween5,
            },
            {
                image: halloween6,
            },
            {
                image: halloween7,
            },
            {
                image: halloween8,
            },
            {
                image: halloween9,
            },
            {
                image: halloween10,
            },
            {
                image: halloween11,
            },
            {
                image: halloween12,
            },
        ],
        imageSide: 'left',
        subHeading: 'Halloween Party',
        paragraph:
            'Что больше всего любят дети? Конечно же, красивые костюмы, веселые конкурсы и сладкое! Для ежегодного праздника Halloween мы создаем невероятные декорации и продумываем до мелочей праздничную программу.',
    },
    {
        id: 2,
        images: [
            {
                image: easter,
            },
            {
                image: easter2,
            },
            {
                image: easter3,
            },
            {
                image: easter4,
            },
            {
                image: easter5,
            },
            {
                image: easter6,
            },
            {
                image: easter7,
            },
        ],
        imageSide: 'right',
        subHeading: 'Easter Bakers',
        paragraph:
            'На этом мастер-классе, посвященном светлому празднику Пасхи, мы изучаем с ребятами тематическую лексику, украшаем верхушки куличей разноцветной глазурью, декорируем пасхальные яйца, а также играем в традиционную английскую игру Easter Egg Hunt.',
    },
    {
        id: 3,
        images: [
            {
                image: sailor,
            },
            {
                image: sailor2,
            },
            {
                image: sailor3,
            },
            {
                image: sailor4,
            },
            {
                image: sailor5,
            },
            {
                image: sailor6,
            },
            {
                image: sailor7,
            },
            {
                image: sailor8,
            },
            {
                image: sailor9,
            },
            {
                image: sailor10,
            },
        ],
        imageSide: 'left',
        subHeading: 'A sailor went to sea',
        paragraph:
            'Наш ежегодный мастер-класс, посвященный началу лета, на котором мы изучаем лексику на морскую тематику, создаем поделку в виде океанического театра и затем разыгрываем сценку на английском языке.',
    },
    {
        id: 4,
        images: [
            {
                image: christmas,
            },
            {
                image: christmas2,
            },
            {
                image: christmas3,
            },
            {
                image: christmas4,
            },
            {
                image: christmas5,
            },
        ],
        imageSide: 'right',
        subHeading: 'Christmas elves',
        paragraph:
            'Мастер-класс по упаковке подарков к Рождеству и на Новый Год. Ребята изучают новогоднюю лексику, поют рождественские песни. Все подарки мы отправляем в детские дома и интернаты.',
    },
];