import { Resend } from "resend";
import { generateRegistrationEmail } from "./template-register.js";

const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function sendEmail(type: string, to: string, payload: any) {
  let subject: string = "";
  let template: string = "";

  if (type === "register:seller") {
    subject = "Pairfy email confirmation."
    template = generateRegistrationEmail({ name: "Seller", verifyUrl: "https://x.com/explore" });
  }

  const { data, error } = await resend.emails.send({
    from: "Pairfy <noreply@pairfy.store>",
    to: [to],
    subject: subject,
    html: template,
  });

  console.log({ data });

  if (error) {
    throw new Error("sendEmailError: " + error);
  }
}
