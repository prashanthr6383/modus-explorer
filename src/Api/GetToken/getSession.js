import axios from "axios";

const GetSession = async (token) => {
  try {
    const res = await axios.get(
      "https://eu1.api.trimble.com/trimbledeveloperprogram/assistants/v1/agents/modus-explorer/sessions",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data?.sessions[0]?.session_id;
  } catch (error) {
    console.error("Error fetching token:", error);
  }
};

export default GetSession;
