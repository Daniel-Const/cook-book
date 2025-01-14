import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
    message: string;
};

export default function handler() {
    return { message: 'Hello from Next.js!' };
}
