export const clientTemplate = (name: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Contacting Us</title>
  <style>
    body { 
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      background-color: #f9fafb;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding: 20px 0;
      border-bottom: 2px solid #e9212e;
    }
    .logo {
      width: 150px;
      height: auto;
    }
    .content {
      padding: 30px 20px;
      color: #374151;
    }
    .footer {
      text-align: center;
      padding: 20px;
      background-color: #1f2937;
      color: #ffffff;
      border-radius: 0 0 8px 8px;
    }
    .social-links {
      margin-top: 20px;
    }
    .social-links a {
      margin: 0 10px;
      color: #ffffff;
      text-decoration: none;
    }
    .highlight {
      color: #e9212e;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://your-logo-url.com/logo.png" alt="LUXE" class="logo">
    </div>
    <div class="content">
      <h2>Thank You for Contacting Us, ${name}!</h2>
      <p>We appreciate your interest in LUXE Kitchen Solutions. This email confirms that we've received your inquiry.</p>
      <p>Our team will review your request and get back to you within 24-48 hours.</p>
      <p>In the meantime, you can:</p>
      <ul>
        <li>Browse our <span class="highlight">latest kitchen designs</span></li>
        <li>Explore our <span class="highlight">modular solutions</span></li>
        <li>Check out our <span class="highlight">customer testimonials</span></li>
      </ul>
      <p>If you have any urgent questions, please don't hesitate to call us at <span class="highlight">(123) 456-7890</span>.</p>
    </div>
    <div class="footer">
      <p>LUXE Kitchen Solutions</p>
      <p>123 Kitchen Street, Design City, DC 12345</p>
      <div class="social-links">
        <a href="#">Facebook</a>
        <a href="#">Instagram</a>
        <a href="#">LinkedIn</a>
      </div>
      <p>&copy; ${new Date().getFullYear()} LUXE. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

export const adminTemplate = (formData: any) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
  <style>
    body { 
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      background-color: #f9fafb;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding: 20px 0;
      border-bottom: 2px solid #e9212e;
    }
    .logo {
      width: 150px;
      height: auto;
    }
    .content {
      padding: 30px 20px;
      color: #374151;
    }
    .detail-row {
      margin-bottom: 15px;
      padding: 10px;
      background-color: #f3f4f6;
      border-radius: 4px;
    }
    .label {
      font-weight: bold;
      color: #e9212e;
    }
    .footer {
      text-align: center;
      padding: 20px;
      background-color: #1f2937;
      color: #ffffff;
      border-radius: 0 0 8px 8px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://your-logo-url.com/logo.png" alt="LUXE" class="logo">
    </div>
    <div class="content">
      <h2>New Contact Form Submission</h2>
      <p>A new inquiry has been received from the website contact form.</p>
      
      <div class="detail-row">
        <span class="label">Name:</span>
        <span>${formData.name}</span>
      </div>
      
      <div class="detail-row">
        <span class="label">Email:</span>
        <span>${formData.email}</span>
      </div>
      
      <div class="detail-row">
        <span class="label">Phone:</span>
        <span>${formData.phone}</span>
      </div>
      
      <div class="detail-row">
        <span class="label">Subject:</span>
        <span>${formData.subject}</span>
      </div>
      
      <div class="detail-row">
        <span class="label">Message:</span>
        <p>${formData.message}</p>
      </div>
      
      <p>Please respond to this inquiry within 24-48 hours.</p>
    </div>
    <div class="footer">
      <p>LUXE Kitchen Solutions - Internal Communication</p>
      <p>&copy; ${new Date().getFullYear()} LUXE. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;