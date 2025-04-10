import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function sendEmail(type: string, to: string) {
  const { data, error } = await resend.emails.send({
    from: 'Pairfy <noreply@pairfy.store>',
    to: [to],
    subject: "Hello World",
    html: "<strong>It works!</strong>",
  });

  console.log({ data });

  if (error) {
    throw new Error("sendEmailError: " + error);
  }
}
