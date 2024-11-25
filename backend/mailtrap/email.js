import { VERIFICATION_EMAIL_TEMPLATE } from "./mailTemplate.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        });

        console.log("Verification email sent: ", response);
    } catch (error) {
        console.error(`Error sending verification`, error);

		throw new Error(`Error sending verification email: ${error}`);
    }
}