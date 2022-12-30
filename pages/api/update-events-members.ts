import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// type Data = {
//     name: string;
// };

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
    const { members, page_id } = req.body;

    const options = {
        method: 'PATCH',
        url: `https://api.notion.com/v1/pages/${page_id}`,
        headers: {
            accept: 'application/json',
            'Notion-Version': '2022-06-28',
            'content-type': 'application/json',
            Authorization: `Bearer ${process.env.NOTION_KEY}`,
        },
        data: {
            properties: {
                participants: {
                    number: members,
                },
            },
        },
    };

    try {
        const response = await axios(options);
        const status = response.status;
        const newMembers = response.data.properties.participants.number
        res.status(200).send({ status, newMembers });
    } catch {
        res.status(500).send({ error: 'Failed to fetch data' });
    }
};
export default handler;
