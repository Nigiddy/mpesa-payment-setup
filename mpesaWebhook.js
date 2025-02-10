const express = require("express");
const app = express();
app.use(express.json());

app.post("/callback", (req, res) => {
  const mpesaResponse = req.body;
  console.log("MPESA Response:", mpesaResponse);

  if (mpesaResponse.Body.stkCallback.ResultCode === 0) {
    console.log("Payment Successful:", mpesaResponse.Body.stkCallback.CallbackMetadata);
    // Unlock internet access here
  } else {
    console.log("Payment Failed");
  }

  res.sendStatus(200);
});

app.listen(3000, () => console.log("Server running on port 3000"));
