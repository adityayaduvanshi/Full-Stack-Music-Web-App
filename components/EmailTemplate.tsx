import { NextApiRequest } from 'next';
import * as React from 'react';
import Box from './Box';

interface EmailTemplateProps {
  firstName?: string;
  type?: '' | 'firstName' | 'default';
}

export const DefaultEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({}) => (
  <div>
    <h1>Welcome!</h1>
  </div>
);

export const DownloadEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({}) => (
  <Box>
    <h1>Soapstone Robots</h1>
    <h3>Your Download Is Available</h3>
  </Box>
);

export const FirstNameEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
  </div>
);

export const emailTemplateFromType = (type: string, req: NextApiRequest) => {
  if (type === 'firstName' && req.body?.firstName)
    return <FirstNameEmailTemplate firstName={req.body.firstName } />;
  
  return <DefaultEmailTemplate />;
}

export default emailTemplateFromType;
