// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    revalidate: boolean
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    try {
        await res.revalidate("/product/static");
        return res.json({ revalidate: true });
    } catch (err) {
        return res.status(500).send({ revalidate: false });
    }
}
