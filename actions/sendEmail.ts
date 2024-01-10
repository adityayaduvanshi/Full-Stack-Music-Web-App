interface EmailProps {
  msg: string;
  to: string;
  subject?: string;
  type?: string;
}

const sendEmail = async (email: EmailProps) => {
  if (!email.subject) email.subject = 'Test Message'
  const data = {
    msg: email.msg, 
    to: email.to, 
    subject: email.subject,
    type: email.type ?? '',
  }
  
  const response = await fetch("/api/mail/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  return result;
}

export default sendEmail;
