import halloween from '../../../images/thematicEvents/halloween/optimized/1.webp';
import halloween2 from '../../../images/thematicEvents/halloween/optimized/2.webp';
import halloween3 from '../../../images/thematicEvents/halloween/optimized/3.webp';
import halloween4 from '../../../images/thematicEvents/halloween/optimized/4.webp';
import halloween5 from '../../../images/thematicEvents/halloween/optimized/5.webp';
import halloween6 from '../../../images/thematicEvents/halloween/optimized/6.webp';
import halloween7 from '../../../images/thematicEvents/halloween/optimized/7.webp';
import halloween8 from '../../../images/thematicEvents/halloween/optimized/8.webp';
import halloween9 from '../../../images/thematicEvents/halloween/optimized/9.webp';
import halloween10 from '../../../images/thematicEvents/halloween/optimized/10.webp';
import halloween11 from '../../../images/thematicEvents/halloween/optimized/11.webp';
import halloween12 from '../../../images/thematicEvents/halloween/optimized/12.webp';

import easter from '../../../images/thematicEvents/easter/optimized/1.webp';
import easter2 from '../../../images/thematicEvents/easter/optimized/2.webp';
import easter3 from '../../../images/thematicEvents/easter/optimized/3.webp';
import easter4 from '../../../images/thematicEvents/easter/optimized/4.webp';
import easter5 from '../../../images/thematicEvents/easter/optimized/5.webp';
import easter6 from '../../../images/thematicEvents/easter/optimized/6.webp';
import easter7 from '../../../images/thematicEvents/easter/optimized/7.webp';

import sailor from '../../../images/thematicEvents/sailor/optimized/1.webp';
import sailor2 from '../../../images/thematicEvents/sailor/optimized/2.webp';
import sailor3 from '../../../images/thematicEvents/sailor/optimized/3.webp';
import sailor4 from '../../../images/thematicEvents/sailor/optimized/4.webp';
import sailor5 from '../../../images/thematicEvents/sailor/optimized/5.webp';
import sailor6 from '../../../images/thematicEvents/sailor/optimized/6.webp';
import sailor7 from '../../../images/thematicEvents/sailor/optimized/7.webp';
import sailor8 from '../../../images/thematicEvents/sailor/optimized/8.webp';
import sailor9 from '../../../images/thematicEvents/sailor/optimized/9.webp';
import sailor10 from '../../../images/thematicEvents/sailor/optimized/10.webp';

import elfs from '../../../images/thematicEvents/elfs/optimized/1.webp';
import elfs2 from '../../../images/thematicEvents/elfs/optimized/2.webp';
import elfs3 from '../../../images/thematicEvents/elfs/optimized/3.webp';
import elfs4 from '../../../images/thematicEvents/elfs/optimized/4.webp';
import elfs5 from '../../../images/thematicEvents/elfs/optimized/5.webp';
import elfs6 from '../../../images/thematicEvents/elfs/optimized/6.webp';
import elfs7 from '../../../images/thematicEvents/elfs/optimized/7.webp';
import elfs8 from '../../../images/thematicEvents/elfs/optimized/8.webp';

import christmasParty from '../../../images/thematicEvents/christmasParty/optimized/1.webp';
import christmasParty2 from '../../../images/thematicEvents/christmasParty/optimized/2.webp';
import christmasParty3 from '../../../images/thematicEvents/christmasParty/optimized/3.webp';
import christmasParty4 from '../../../images/thematicEvents/christmasParty/optimized/4.webp';
import christmasParty5 from '../../../images/thematicEvents/christmasParty/optimized/5.webp';
import christmasParty6 from '../../../images/thematicEvents/christmasParty/optimized/6.webp';
import christmasParty7 from '../../../images/thematicEvents/christmasParty/optimized/7.webp';
import christmasParty8 from '../../../images/thematicEvents/christmasParty/optimized/8.webp';
import christmasParty9 from '../../../images/thematicEvents/christmasParty/optimized/9.webp';

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
                image: elfs,
            },
            {
                image: elfs2,
            },
            {
                image: elfs3,
            },
            {
                image: elfs4,
            },
            {
                image: elfs5,
            },
            {
                image: elfs6,
            },
            {
                image: elfs7,
            },
            {
                image: elfs8,
            },
        ],
        imageSide: 'right',
        subHeading: 'Christmas Elves',
        paragraph:
            'Благотворительный мастер-класс по упаковке новогодних подарков. Наши ученики приносят свои подарки для детей с ОВЗ, ЗПР, детей-сирот, которые мы вместе упаковываем, а после отправляем в детские дома и интернаты.',
    },
    {
        id: 5,
        images: [
            {
                image: christmasParty,
            },
            {
                image: christmasParty2,
            },
            {
                image: christmasParty3,
            },
            {
                image: christmasParty4,
            },
            {
                image: christmasParty5,
            },
            {
                image: christmasParty6,
            },
            {
                image: christmasParty7,
            },
            {
                image: christmasParty8,
            },
            {
                image: christmasParty9,
            },
        ],
        imageSide: 'left',
        subHeading: 'Christmas Party',
        paragraph:
            'Наши ежегодные рождественские вечеринки для разного возраста. Вместе мы изучаем новогоднюю лексику, проводим мастер-класс Gingerbread House Craft, учим новогодние песни, участвуем в Christmas quiz и обмениваемся подарками.',
    },
];
