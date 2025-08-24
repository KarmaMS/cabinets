import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import { clientTemplate, adminTemplate } from './emailTemplates';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Create mail transporter
const transporter = nodemailer.createTransport({
  host: 'mail.cabinets.com.pk',
  port: 465,
  secure: true,
  auth: {
    user: 'sales@cabinets.com.pk',
    pass: 'Pakistan@1947'
  }
});

app.post('/api/contact', async (req, res) => {
  const formData = req.body;

  try {
    // Send confirmation email to client
    await transporter.sendMail({
      from: '"LUXE Kitchen Solutions" <sales@cabinets.com.pk>',
      to: formData.email,
      subject: 'Thank You for Contacting LUXE Kitchen Solutions',
      html: clientTemplate(formData.name)
    });

    // Send notification email to sales team
    await transporter.sendMail({
      from: '"LUXE Website Contact" <sales@cabinets.com.pk>',
      to: 'sales@cabinets.com.pk',
      subject: 'New Contact Form Submission',
      html: adminTemplate(formData)
    });

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ message: 'Error sending emails' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});