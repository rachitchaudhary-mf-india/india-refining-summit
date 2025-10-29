<?php

require '/home2/indiarefining/public_html/testMail/PHPMailer-master/src/Exception.php';
require '/home2/indiarefining/public_html/testMail/PHPMailer-master/src/PHPMailer.php';
require '/home2/indiarefining/public_html/testMail/PHPMailer-master/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $designation = $_POST['designation'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $company = $_POST['company'];

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format.";
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        $mail->SMTPDebug = 0; // Set to 3 for debugging
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'dharmesh.letscalendar@gmail.com'; // Your Gmail address
        $mail->Password = 'ajjw lnot kvwl wlur';              // Use App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom('dharmesh.letscalendar@gmail.com', 'Enquiry');
        $mail->addAddress('pansardharmesh@gmail.com', 'Enquiry Received');
        $mail->addAddress('info@messefrankfurtindia.in', 'Enquiry Received');
        $mail->addCC('anchal.choudhary@india.messefrankfurt.com', 'Copy Recipient');

        $mail->isHTML(true);
        $mail->Subject = 'From India Refining Summit Exhibit 2025';
        $mail->Body = "<p><strong>Name:</strong> {$name}</p>
                       <p><strong>Designation:</strong> {$designation}</p>
                       <p><strong>Email:</strong> {$email}</p>
                       <p><strong>Phone:</strong> {$phone}</p>
                       <p><strong>Company:</strong> {$company}</p>";

        $mail->AltBody = "Name: {$name}\nDesignation: {$designation}\nEmail: {$email}\nPhone: {$phone}\nCompany: {$company}";

        $mail->send();
        echo 'Message has been sent';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}
?>