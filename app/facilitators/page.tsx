import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import Email from "@/components/emailTemplates/email";
import { generateUniqueToken } from "../lib/auth";

type Props = {};
export default function Facilitators({}: Props) {
  async function send(formData: FormData) {
    "use server";

    const email = formData.get('email')
    console.log(email);
    
    await sendMail({
      to: "nicholas.njagi@student.moringaschool.com",
      name: "Njagi",
      subject: "Test Mail",
    });
  }
  return (
    <section className="">
      <h1 className={"text-3xl font-semibold"}>Facilitators</h1>
      <form action={send}>
        <input type="email" name="email" />
        <button>Send </button>
      </form>
    </section>
  );
}

async function sendMail({
  to,
  name,
  subject,
}: {
  to: string;
  name: string;
  subject: string;
}) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });
  try {
    const testResult = await transporter.verify();
    console.log(testResult);
  } catch (error) {
    console.log(error);
    return;
  }

  const token = generateUniqueToken('njag@rgtr.sd')

  try {
    const sendResult = await transporter.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html: render(<Email url={`http://localhost:3000/api/validate-token?email=${'njag@rgtr.sd'}&token=${token}`} />),
    });
    console.log(sendResult);
  } catch (error) {
    console.log(error);
  }
}
