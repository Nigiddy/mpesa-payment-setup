require("dotenv").config(); // Load environment variables from .env file
const axios = require("axios");

const getToken = async () => {
  const credentials = Buffer.from(
    `${process.env.LIMITED_APP_KEY}:${process.env.LIMITED_APP_SECRET}`
  ).toString("base64");

  try {
    const response = await axios({
      method: "get",
      url: "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    });

    // Log the entire response object to check if the access_token is returned
    console.log("getToken response:", response.data); 

    if (response.data && response.data.access_token) {
      return response.data.access_token; // Return the access token
    } else {
      console.error("Access Token not found in response:", response.data);
      throw new Error("Access Token not found in response.");
    }
  } catch (error) {
    console.error("Error fetching Access Token:", error.message || error);
    throw new Error("Failed to retrieve access token.");
  }
};

module.exports = { getToken };
