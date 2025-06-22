// This is a basic example using Nodemailer. You'll need to install it (npm install nodemailer)
// and configure it with your email provider's details.
// IMPORTANT: Store sensitive credentials like email passwords in environment variables, not directly in code.

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, date } = req.body;

    if (!name || !email || !date) {
      return res.status(400).json({ message: 'Name, email, and date are required' });
    }

    // Replace with your actual email transport configuration
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, // e.g., 'smtp.example.com'
      port: parseInt(process.env.EMAIL_PORT || '587', 10), // e.g., 587 or 465
      secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // your email address
        pass: process.env.EMAIL_PASS, // your email password or app-specific password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'no-reply@example.com',
      to: email,
      subject: 'Polaris Consulting Info Session Link',
      text: `Hi ${name}!

Thank you for registering for the Polaris Consulting Info Session happening on ${date} at 9:00 AM EST.

Here is the Zoom link for the session:
https://us05web.zoom.us/j/8315104346?pwd=VV4D2u3cLJFdbIa4F8fU12uTfkHWHH.1

If you have any questions, please contact consultants.polaris@gmail.com or visit www.polarisconsult.org.
`,
      html: `<p>Hi ${name}!</p>
<p>Thank you for registering for the <strong>Polaris Consulting Info Session</strong> happening on <strong>${date} at 9:00 AM EST</strong>.</p>
<p>Here is the Zoom link for the session:<br><a href="https://us05web.zoom.us/j/8315104346?pwd=VV4D2u3cLJFdbIa4F8fU12uTfkHWHH.1</a></p>
<p>If you have any questions, please contact <a href="mailto:consultants.polaris@gmail.com">consultants.polaris@gmail.com</a> or visit <a href="https://www.polarisconsult.org">www.polarisconsult.org</a>.</p>`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
