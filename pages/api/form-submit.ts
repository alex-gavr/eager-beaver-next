import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const botId = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
const chatIDLera = process.env.NEXT_PUBLIC_TELEGRAM_LERA_ID;
const chatIDGavr = process.env.NEXT_PUBLIC_TELEGRAM_GAVR_ID;

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
    const { name, tel, email, id, beaverCoins, event, age, date } = req.body;

    // Telegram Form Submit
    const messageFormCompleted = `
    Лера, привет 👋%0A
Новый человек заполнил форму 😯%0A
Имя: ${name}%0A
Номер Телефона: 8${tel}%0A
Свяжемся с ними? 😌
    `;

    //  TELEGRAM FUTURE EVENT
    const messageForFutureEvent = `
    Лера, привет 🤍%0A
${name} хочет привести ребенка на ${event} 🎉%0A
Который проходит: ${date}%0A
Там где возраст деток: ${age}%0A
Телефон для связи с ними: 8${tel}%0A
Напиши им 😉
`;

    const url = `https://api.telegram.org/bot${botId}/sendMessage?chat_id=${chatIDLera}&text=${event ? messageForFutureEvent : messageFormCompleted}`;
    const url2 = `https://api.telegram.org/bot${botId}/sendMessage?chat_id=${chatIDGavr}&text=${event ? messageForFutureEvent : messageFormCompleted}`;

    // Notion Add User to DB
    const notionOptions = {
        method: 'POST',
        url: `https://api.notion.com/v1/pages`,
        headers: {
            accept: 'application/json',
            'Notion-Version': '2022-06-28',
            'content-type': 'application/json',
            Authorization: `${process.env.NEXT_PUBLIC_NOTION_KEY}`,
        },
        data: {
            parent: {
                database_id: process.env.NEXT_PUBLIC_NOTION_USERS_DB,
            },
            properties: {
                key: {
                    title: [
                        {
                            text: {
                                content: id,
                            },
                        },
                    ],
                },
                name: {
                    rich_text: [
                        {
                            type: 'text',
                            text: {
                                content: name,
                            },
                        },
                    ],
                },
                email: {
                    email: email,
                },
                phone: {
                    phone_number: tel,
                },
                beaver_coins: {
                    number: beaverCoins,
                },
            },
        },
    };

    if (event) {
        try {
            const telegramAlertSubmit = await axios.get(url);
            const status = telegramAlertSubmit.status;
            res.status(200).send({ status });
        } catch {
            res.status(500).send({ status: 500 });
        }
    } else {
        try {
            const telegramAlertSubmit = await axios.get(url);
            const telegramAlertSubmitGavr = axios.get(url2);
            const status = telegramAlertSubmit.status;
            const notionUserSubmit = await axios(notionOptions);
            const status2 = notionUserSubmit.status;
            res.status(200).send({ status, status2 });
        } catch {
            res.status(500).send({ status: 500 });
        }
    }
};
export default handler;
