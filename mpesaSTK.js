require("dotenv").config(); // Load environment variables from .env file
const axios = require("axios");
const { getToken } = require("./mpesaToken"); // Import getToken function

const stkPush = async () => {
  try {
    const token = await getToken(); // Fetch access token
    console.log("Access Token:", token); // Debugging step

    if (!token) {
      console.error("Access Token is invalid or undefined.");
      return;
    }

    const shortCode = "174379"; // Test Paybill
    const passKey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
    const phoneNumber = "254795381991"; // Your number
    const amount = 10;
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 14);
    const password = Buffer.from(shortCode + passKey + timestamp).toString("base64");

    const data = {
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: shortCode,
      PhoneNumber: phoneNumber,
      CallBackURL: "https://4e80-105-29-165-232.ngrok-free.app",
      AccountReference: "Hotspot Payment",
      TransactionDesc: "Payment for WiFi access",
    };

    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("STK Push Response:", response.data);
  } catch (error) {
    console.error("STK Push Error:", error.response ? error.response.data : error);
  }
};

// Call the stkPush function
stkPush();
