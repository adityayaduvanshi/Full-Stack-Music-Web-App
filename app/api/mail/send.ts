import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import EmailTemplate from '@/components/EmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { body: { msg, from, to, subject, type } } = req;
  const { data, error } = await resend.emails.send({
    to,
    subject,
    from: 'no-reply@thesoapstone.net',
    react: EmailTemplate(type, req),
  });

  if (error) return res.status(400).json(error);

  console.log('sent mail', { to, type, subject, data });
  res.status(200).json(data);
};
