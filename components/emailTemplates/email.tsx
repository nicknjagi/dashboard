import * as React from "react";
import {
  Tailwind,
  Html,
  Button,
  render,
  Text,
  Head,
  Container,
  Heading,
  Hr,
  Link,
  Body,
  Section,
} from "@react-email/components";

type EmailProps = {
  url: any;
};

export function generateHtml(to: string, token: string) {
  const html = render(
    <Email
      url={`${process.env.NEXT_PUBLIC_URL}/api/validate-token?email=${to}&token=${token}`}
    />
  );
  return html;
}

const Email: React.FC<EmailProps> = ({ url }) => {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              forrestGreen: "#013132",
              cultured:'#F4F7FA',
              gold:'#C18729'
            },
          },
        },
      }}
    >
    <Html lang="en">
      <Head />
      <Body className="m-auto px-4 py-12 bg-cultured">
        <Container
          className="bg-white border border-solid border-neutral-200 rounded my-[40px] w-full p-5 max-w-[465px] mx-auto"
        >
          <Heading className="text-forrestGreen text-2xl">
            Create your account
          </Heading>
          <Text>
            Click the link below to create your account. The link will only be
            valid for the next 30 minutes.
          </Text>
          <Section className="text-center my-8">
            <Button
              href={url}
              className="text-center font-medium bg-forrestGreen rounded-lg text-cultured px-6 py-3"
            >
              Create Account
            </Button>
          </Section>
          <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full"/>
          <Link href="https://mymindcapsule.com" className="text-sm text-neutral-500">mymindcapsule</Link>
        </Container>
      </Body>
    </Html>
    </Tailwind>
  );
};

