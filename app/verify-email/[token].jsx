import { activateUser } from "@components/authentication/data/user";
import VerifyEmail from "@components/authentication/ui/VerifyEmail";
import { WelcomeEmailTemplate } from "@components/mailtemplates/welcome-email-template";
import { AppRoutes } from "@constants/app_routes";
import { getUser } from "@db/profile";
import { Resend } from "resend";
import { getVerificationToken } from "../../db/verification";

const VerifyEmailAddress = ({ title, message, url, action }) => {
  return (
    <VerifyEmail title={title} message={message} url={url} action={action} />
  );
};

export const getServerSideProps = async (context) => {
  const { token } = context.query;
  const verificationToken = await getVerificationToken(token?.toString());
  const resend = new Resend(`${process.env.RESEND_API_KEY}`);
  const sender = process.env.EHA_RECRUITMENT_MAIL;

  let title = "";
  let message = "";
  let url = "";
  let action = "Click here to Log in";

  if (!verificationToken) {
    (title = "Email verification unsuccessful"),
      (message =
        "Your email could not be verified at this time. Please click the link below to sign up for an account.");
    url = AppRoutes.SignUpIndividual;
    action = "Click here to sign up";
  } else if (verificationToken && verificationToken.verified) {
    (title = "Email already verified!"),
      (message =
        "Your email was successfully verified previously. Please click the link below to login to your account");
    url = AppRoutes.Login;
    action = "Click here to Log in";
  } else if (verificationToken && new Date() <= verificationToken.expires) {
    const user = await getUser(verificationToken.identifier);
    await activateUser(verificationToken.identifier);

    (title = "Email verification successful!"),
      (message =
        "Your email was successfully verified. Please click the link below to login to your account");
    url = AppRoutes.Login;
    action = "Click here to Log in";

    await resend.emails.send({
      from: `Recruitment Team EHA Clinics <${sender}>`,
      to: [`${user?.email}`],
      subject: "WELCOME TO EHA RECRUITMENT",
      react: WelcomeEmailTemplate({
        name: `${user?.name}`,
        verificationUrl: process.env.NEXT_PUBLIC_AUTH_URL,
      }),
    });
  } else if (verificationToken && new Date() > verificationToken.expires) {
    (title = "Verification link expired"),
      (message =
        "Your email verification link has expired. Please click the link below to re-generate a new link");
    url = AppRoutes.RegenerateToken(verificationToken.token);
    action = "Click here to receive a new activation email";
  } else {
    (title = "No previous signup!"),
      (message =
        "Your previous sign up could not be verified at this time. Please click the link below to sign up for an account.");
    url = AppRoutes.SignUpIndividual;
    action = "Click here to sign up";
  }

  return {
    props: {
      title,
      message,
      url,
      action,
    },
  };
};

export default VerifyEmailAddress;
