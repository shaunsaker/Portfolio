<?php

// Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the form fields and remove whitespace.
        $name = strip_tags(trim($_POST["name"]));
				$name = str_replace(array("\r","\n"),array(" "," "),$name);
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $message = trim($_POST["message"]);

        // Check that data was sent to the mailer.
        if ( empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Set a 400 (bad request) response code and exit.
            http_response_code(400);
            echo "Oops! There was a problem with your submission. Please complete the form and try again.";
            exit;
        }

		require_once './lib/PHPMailer/PHPMailerAutoload.php'; 

		$m = new PHPMailer;	

		$m->isSMTP();
		$m->SMTPAuth = true;

		$m->Host = 'cp06-jhb.za-dns.com';
		$m->Username = 'info@shaunsaker.com';
		$m->Password = 'Reason11!';
		$m->SMTPSecure = 'ssl';
		$m->Port = 465;

		$m->IsHTML(true);

		$m->From = $email;
		$m->FromName = $name;
		$m->addReplyTo = ('info@shaunsaker.com');
		$address = "info@shaunsaker.com";
		$m->AddAddress($address, "Shaun Saker");

		$m->Subject  = 'Portfolio';
		$m->Body = '<h3>' . $name . '</h3><p>sent you an email via your portfolio.</p>' . '<p>' . $message . '</p>';
		$m->AltBody = $name . $message;
		$m->WordWrap = 50;

		if(!$m->send()) 
		{
			// Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "Oops! Something went wrong and we couldn't send your message.";
		} 
		else 
		{
            // Set a 200 (okay) response code.
            http_response_code(200);
            echo "Thank You! Your message has been sent.";
		}
    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "There was a problem with your submission, please try again.";
    }

?>