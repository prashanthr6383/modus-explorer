import axios from "axios";
import { marked } from "marked";

export const GetMessages = async (blob_data, token, messageData) => {
  try {
    const response = await axios.post(
      "https://eu1.api.trimble.com/trimbledeveloperprogram/assistants/v1/agents/modus-explorer/messages",
      {
        blob_url: blob_data,
        message: messageData,
        stream: false,
        model_id: "gpt-4o",
        session_id: token.session,
      },
      {
        headers: {
          Authorization: `Bearer ${token.token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return marked.parse(response.data.message);
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
};
