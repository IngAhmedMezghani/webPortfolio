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
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $to = "ahmed.mezghani@enis.tn";
            $subject = isset($_POST['subject']) ? $_POST['subject'] : 'Contact Form Submission';
            $name = isset($_POST['name']) ? $_POST['name'] : '';
            $email = isset($_POST['email']) ? $_POST['email'] : '';
            $message = isset($_POST['message']) ? $_POST['message'] : '';
            $headers = "From: $name <$email>\r\nReply-To: $email\r\n";

            // For debugging: display errors
            ini_set('display_errors', 1);
            error_reporting(E_ALL);

            if (empty($to) || empty($email) || empty($message)) {
                echo "<span class='error'>Error: missing fields</span>";
                exit;
            }

            // Try to send the mail and output error if it fails
            if (function_exists('mail')) {
                $result = mail($to, $subject, $message, $headers);
                if ($result) {
                    echo "<span class='success'>Your message was sent successfully!</span>";
                } else {
                    echo "<span class='error'>Error: mail() failed. Your server is not configured to send emails.<br>
                    <br>
                    <b>What to do:</b><br>
                    <ul style='text-align:left;max-width:400px;margin:0 auto;'>
                        <li>If you are on localhost, PHP mail will not work unless you set up SMTP (see MailHog, Papercut, or similar).</li>
                        <li>If you are on shared hosting, contact your provider to enable mail() or use SMTP.</li>
                        <li>For reliable email, use PHPMailer with SMTP (Gmail, Outlook, etc.).</li>
                    </ul>
                    </span>";
                }
            } else {
                echo "<span class='error'>Error: mail() function is not available in your PHP installation.</span>";
            }
        } else {
            echo "<span class='error'>Error: invalid request</span>";
        }
        ?>
        <a href="index.html">Back to Portfolio</a>
    </div>

    <!-- Troubleshooting email sending in PHP -->
    <div class="result-container" style="margin-top: 2rem; font-size: 0.9rem; text-align: left;">
        <h3 style="color: #00bcd4;">Troubleshooting email sending in PHP</h3>
        <ol>
            <li><strong>Are you running on localhost (XAMPP, WAMP, MAMP, etc.)?</strong>
                <ul>
                    <li>The PHP <code>mail()</code> function will NOT work out-of-the-box on most local servers.</li>
                    <li>You must configure an SMTP server or use a tool like <a href="https://github.com/mailhog/MailHog" style="color: #00bcd4;">MailHog</a> or <a href="https://github.com/ChangemakerStudios/Papercut-SMTP" style="color: #00bcd4;">Papercut SMTP</a> for local testing.</li>
                </ul>
            </li>
            <li><strong>Are you on shared hosting or a real server?</strong>
                <ul>
                    <li>Some hosts block the <code>mail()</code> function for spam prevention.</li>
                    <li>Check your host's documentation or control panel for email settings.</li>
                </ul>
            </li>
            <li><strong>Check your PHP error logs.</strong>
                <ul>
                    <li>Errors from <code>mail()</code> are often silent. Enable error reporting in your PHP file:</li>
                    <pre><code>ini_set('display_errors', 1);
error_reporting(E_ALL);</code></pre>
                </ul>
            </li>
            <li><strong>Try a simple test script:</strong>
                <pre><code>&lt;?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
if(mail('your@email.com', 'Test', 'Test message')) {
    echo 'Mail sent';
} else {
    echo 'Mail failed';
}
?&gt;</code></pre>
                <ul>
                    <li>Replace <code>your@email.com</code> with your real email.</li>
                    <li>If you see "Mail failed", your server is not configured for email.</li>
                </ul>
            </li>
            <li><strong>For reliable email, use PHPMailer with SMTP:</strong>
                <ul>
                    <li>Download <a href="https://github.com/PHPMailer/PHPMailer" style="color: #00bcd4;">PHPMailer</a>.</li>
                    <li>Use your Gmail, Outlook, or another SMTP provider for sending.</li>
                    <li>Example:</li>
                    <pre><code>&lt;?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);
try {
    $mail-&gt;isSMTP();
    $mail-&gt;Host = 'smtp.gmail.com';
    $mail-&gt;SMTPAuth = true;
    $mail-&gt;Username = 'your@gmail.com';
    $mail-&gt;Password = 'your_app_password';
    $mail-&gt;SMTPSecure = 'tls';
    $mail-&gt;Port = 587;

    $mail-&gt;setFrom($_POST['email'], $_POST['name']);
    $mail-&gt;addAddress('your@email.com');
    $mail-&gt;Subject = $_POST['subject'];
    $mail-&gt;Body = $_POST['message'];

    $mail-&gt;send();
    echo 'success';
} catch (Exception $e) {
    echo 'error: ' . $mail-&gt;ErrorInfo;
}
?&gt;</code></pre>
                    <li>You must use an <a href="https://support.google.com/accounts/answer/185833" style="color: #00bcd4;">App Password</a> for Gmail.</li>
                </ul>
            </li>
            <li><strong>Summary:</strong>
                <ul>
                    <li>If you are on localhost, PHP mail will not work unless you set up SMTP.</li>
                    <li>On real hosting, check with your provider.</li>
                    <li>For best results, use PHPMailer with SMTP.</li>
                </ul>
            </li>
        </ol>
        <p style="color: #d32f2f;">If you need a working example for your environment, tell me if you are on localhost or hosting, and I can give you a step-by-step guide.</p>
    </div>
</body>
</html>
