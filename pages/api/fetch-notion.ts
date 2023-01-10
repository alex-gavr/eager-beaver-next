import { NextApiRequest, NextApiResponse } from 'next';
import { fetchNotion } from '../../utils/fetchNotion';

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
    const { dbKey } = req.body;
    try {
        const futureEvents = await fetchNotion(dbKey);
        res.status(200).send({ futureEvents });
    } catch (err) {
        res.status(500).send({ status: 500 });
    }
};
export default handler;
