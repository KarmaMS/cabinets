<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $subject = $_POST['subject'] ?? '';
    $message = $_POST['message'] ?? '';

    // Email settings
    $to = 'sales@cabinets.com.pk';
    $from = 'sales@cabinets.com.pk';
    
    // Client auto-response email
    $clientSubject = 'Thank You for Contacting LUXE Kitchen Solutions';
    $clientMessage = "
    <html>
    <body style='font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto;'>
        <div style='background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);'>
            <h2 style='color: #333;'>Thank You for Contacting Us, {$name}!</h2>
            <p>We appreciate your interest in LUXE Kitchen Solutions. This email confirms that we've received your inquiry.</p>
            <p>Our team will review your request and get back to you within 24-48 hours.</p>
            <p>If you have any urgent questions, please don't hesitate to call us.</p>
            <div style='margin-top: 20px; padding: 20px; background-color: #1f2937; color: #ffffff; text-align: center; border-radius: 0 0 8px 8px;'>
                <p>LUXE Kitchen Solutions</p>
                <p>&copy; " . date('Y') . " LUXE. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>";

    // Admin notification email
    $adminSubject = 'New Contact Form Submission';
    $adminMessage = "
    <html>
    <body style='font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto;'>
        <div style='background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);'>
            <h2 style='color: #333;'>New Contact Form Submission</h2>
            <div style='background-color: #f3f4f6; padding: 10px; margin: 10px 0; border-radius: 4px;'>
                <p><strong>Name:</strong> {$name}</p>
                <p><strong>Email:</strong> {$email}</p>
                <p><strong>Phone:</strong> {$phone}</p>
                <p><strong>Subject:</strong> {$subject}</p>
                <p><strong>Message:</strong> {$message}</p>
            </div>
        </div>
    </body>
    </html>";

    // Headers for HTML email
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: LUXE Kitchen Solutions <{$from}>\r\n";
    $headers .= "Reply-To: {$from}\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Send emails
    $clientSent = mail($email, $clientSubject, $clientMessage, $headers);
    $adminSent = mail($to, $adminSubject, $adminMessage, $headers);

    if ($clientSent && $adminSent) {
        http_response_code(200);
        echo json_encode(['message' => 'Emails sent successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Error sending emails']);
    }
} else {
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed']);
}
?>