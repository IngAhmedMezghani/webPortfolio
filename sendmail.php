<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Contact Form Submission</title>
    <style>
        body {
            background: #181a1b;
            color: #f5f7fa;
            font-family: 'Segoe UI', Arial, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
        }
        .result-container {
            background: #23272f;
            padding: 2rem 2.5rem;
            border-radius: 10px;
            box-shadow: 0 2px 16px rgba(0,0,0,0.25);
            text-align: center;
        }
        .success {
            color: #00bcd4;
            font-size: 1.3rem;
            margin-bottom: 1rem;
        }
        .error {
            color: #d32f2f;
            font-size: 1.2rem;
            margin-bottom: 1rem;
        }
        a {
            color: #00bcd4;
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="result-container">
        <?php
        // Load PHPMailer classes
        require 'PHPMailer/src/PHPMailer.php';
        require 'PHPMailer/src/SMTP.php';
        require 'PHPMailer/src/Exception.php';

        use PHPMailer\PHPMailer\PHPMailer;
        use PHPMailer\PHPMailer\Exception;

        header('Content-Type: text/plain');

        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $mail = new PHPMailer(true);
            try {
                // SMTP configuration
                $mail->isSMTP();
                $mail->Host = 'smtp.gmail.com'; // For Gmail
                $mail->SMTPAuth = true;
                $mail->Username = 'your_gmail@gmail.com'; // Your SMTP username
                $mail->Password = 'your_app_password';    // Your SMTP password or app password
                $mail->SMTPSecure = 'tls';
                $mail->Port = 587;

                // Email content
                $mail->setFrom('your_gmail@gmail.com', 'Portfolio Contact');
                $mail->addAddress('ahmed.mezghani@enis.tn');
                $mail->addReplyTo($_POST["email"], $_POST["name"]);
                $mail->Subject = "Portfolio Contact Form: " . htmlspecialchars($_POST["name"]);
                $mail->Body = "Name: " . htmlspecialchars($_POST["name"]) . "\n"
                            . "Email: " . htmlspecialchars($_POST["email"]) . "\n"
                            . "Message:\n" . htmlspecialchars($_POST["message"]);

                $mail->send();
                echo "success";
            } catch (Exception $e) {
                error_log("Mailer Error: " . $mail->ErrorInfo);
                echo "error";
            }
        } else {
            echo "error";
        }
        ?>
        <a href="index.html">Back to Portfolio</a>
    </div>
</body>
</html>
