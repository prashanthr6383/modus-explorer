import React, { useEffect, useState } from "react";
import axios from "axios";
import GetMessage from "../getMessageData/getMessage";

const FileUploader = ({ getBlobData, accessToken }) => {
  const [fileData, setFileData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [messageData, setMessageData] = useState("");

  useEffect(() => {
    if (fileData && messageData) {
      getBlobData(fileData, messageData);
    }
  }, [fileData, getBlobData, messageData]);

  const handleFileUpload = async () => {
    if (!selectedFile) {
      console.error("No file selected for upload");
      return;
    }

    if (!messageData) {
      console.error("No message data provided for upload");
      return;
    }

    const formData = new FormData();
    formData.append("image_file", selectedFile);

    try {
      const response = await axios.post(
        `https://eu1.api.trimble.com/trimbledeveloperprogram/assistants/v1/agents/modus-explorer/sessions/${accessToken.session}/images`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("response", response.data);
      setFileData(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  useEffect(() => {
    const dropzone = document.querySelector("modus-file-dropzone");

    const handleDropzoneFiles = (event) => {
      const [files, error] = event.detail;
      if (error) {
        console.error("File drop error:", error);
      } else if (files && files.length > 0) {
        console.log("Selected file:", files[0]);
        setSelectedFile(files[0]);
      }
    };

    if (dropzone) {
      dropzone.addEventListener("files", handleDropzoneFiles);
    }

    return () => {
      if (dropzone) {
        dropzone.removeEventListener("files", handleDropzoneFiles);
      }
    };
  }, []);

  const handleMessage = (message) => {
    setMessageData(message);
  };

  return (
    <div>
      <div>
        {selectedFile && (
          <div style={{ padding: "10px" }}>
            <p>Selected file: {selectedFile.name}</p>
          </div>
        )}

        <div style={{ width: "300px", padding: "10px" }}>
          <modus-file-dropzone
            aria-label="dropzone"
            dropzone-Height="175px"
            dropzone-Width="400px"
            multiple="false"
          ></modus-file-dropzone>
        </div>

        <GetMessage messageData={handleMessage} />

        <div style={{ width: "300px", padding: "10px" }}>
          <modus-button
            onClick={handleFileUpload}
            disabled={!selectedFile || !messageData}
          >
            Get Details
          </modus-button>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
