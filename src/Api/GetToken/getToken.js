import axios from "axios";

const GetToken = async () => {
  try {
    const res = await axios.post(
      "https://id.trimble.com/oauth/token",
      {
        grant_type: "client_credentials",
        client_id: "0c8d8e0d-6058-460b-b11a-1a112186ad64",
        client_secret: "e227c45febeb49a6a590cd729d0a0be0",
        scope: "release_notes",
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          //   connection: "keep-alive",
          Accept: "*/*",
          //   "Accept-Encoding": "gzip, deflate, br",
        },
      }
    );
    return res.data.access_token;
  } catch (error) {
    console.error("Error fetching token:", error);
  }
};

export default GetToken;
