import { Resend } from "resend";
const resend = new Resend("re_csdUkveQ_Ng3fCRp2g7rMDkWjgwyYPCPZ");

interface Email {
  fromName: string;
  fromEmail: string;
  text: string;
}

export const sendEmail = (email: Email) =>
  resend.emails.send({
    subject: `The question from ${email.fromName}`,
    text: email.text,
    to: "admin@trustbetonchain.com ",
    from: email.fromEmail,
  });
