import { useEffect, useState } from "react";
import GetToken from "./Api/GetToken/getToken";
import FileUploader from "./Api/FileUpload/fileUploader";
import { GetMessages } from "./Api/getMessageData/getMessageData";
import { defineCustomElements } from "@trimble-oss/modus-web-components/loader";
import "./App.css";
import GetSession from "./Api/GetToken/getSession";

function MyComponent() {
  const [fileData, setFileData] = useState(null);
  const [messageData, setMessageData] = useState("");
  const [token, setToken] = useState(null);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    defineCustomElements();

    const fetchToken = async () => {
      const fetchedToken = await GetToken();
      const fetchedSession = await GetSession(fetchedToken);
      setToken({ token: fetchedToken, session: fetchedSession });
    };

    fetchToken();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (fileData && token) {
        const messages = await GetMessages(fileData, token, messageText);
        setMessageData(messages);
      }
    };

    fetchMessages();
  }, [fileData, token, messageText]);

  const getBlobData = (data, message) => {
    setFileData(data);
    setMessageText(message);
  };

  return (
    <div className="container-main">
      <div className="flex-contain">
        <span>
          <h3 style={{ margin: "5px" }}>Modus Explorer</h3>
          <p style={{ fontSize: 14, margin: "5px" }}>
            Modus Explorer analyzes your images to identify the best components
            from Modus Web Components and suggests the most suitable options to
            streamline your project development.
          </p>
          <FileUploader getBlobData={getBlobData} accessToken={token} />
        </span>
      </div>
      <div className="message_body">
        <div dangerouslySetInnerHTML={{ __html: messageData }} />
      </div>
    </div>
  );
}

export default MyComponent;
