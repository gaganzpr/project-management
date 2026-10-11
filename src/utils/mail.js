import Mailgen from "mailgen";
import nodemailer from "nodemailer"

const sendEmail = async (options) => {
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Task Manager",
            link: "https://taskmanagelink.com"
        }
    })

    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
    const emailHtml = mailGenerator.generate(options.mailgenContent);

    const transporter = nodemailer.createTransport({
        host:process.env.MAILTRAP_SMTP_HOST,
        port:process.env.MAILTRAP_SMTP_PORT,
        auth:{
            user:process.env.MAILTRAP_SMTP_USER,
            pass:process.env.MAILTRAP_SMTP_PASS
        }
    })

    const mail = {
        from: "mail.taskmanager@example.com",
        to:options.email,
        subject:options.subject,
        text:emailTextual,
        html:emailHtml
    }

    try {
        await transporter.sendMail(mail)
    } catch (error) {
        console.log("Email service fialed. THis might happened due to credentials, check mail trap credentials");
        console.log("Error", error);
        
    }

}

const emailVerificationMailGenContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: "Welcome to our App!",
            action: {
                instructions: "To verify your email click on the link button",
                button: {
                    color: "#1aaefa",
                    text: "Verify your email",
                    link: verificationUrl
                }
            },
            outro: "Need help or have questions? Reply to this email. We will help."
        }
    }
}

const forgotPasswordMailGenContent = (username, passwordResetUrl) => {
    return {
        body: {
            name: username,
            intro: "We got a request to reset the password of your accound",
            action: {
                instructions: "To reset your password click on the following button",
                button: {
                    color: "#22bc66",
                    text: "Reset Password",
                    link: passwordResetUrl
                }
            },
            outro: "Need help or have questions? Reply to this email. We will help."
        }
    }
}

export {emailVerificationMailGenContent, forgotPasswordMailGenContent, sendEmail}