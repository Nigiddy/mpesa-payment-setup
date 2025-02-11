# mpesa-payment-setup
I used Safaricom Daraja API for handling payments

Step 1: Run the Access Token Script

node mpesaToken.js

If it works it should return something like this:

{
  "access_token": "your_generated_token",
  "expires_in": "3599"
}

Step 2: Run the STK Push Script
 replace:
YOUR_MPESA_PASSKEY with the passkey from Safaricom.
2547XXXXXXXX with your actual phone number (in international format).
https://yourdomain.com/callback with a real callback URL (for now, you can use ngrok).
Then, run:
node mpesaSTK.js
✅ If successful, you should receive an MPESA pop-up on your phone asking for confirmation.
Step 3: Start the Webhook Server
Run:
node mpesaWebhook.js

✅ This will listen for MPESA responses.
💡 To test locally, use ngrok to expose your local server:
ngrok http 3000

Copy the generated public URL and use it as your CallBackURL.

Once STK push works and MPESA sends a response, you're good!!
