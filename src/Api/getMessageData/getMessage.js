import React, { useEffect } from "react";

const GetMessage = ({ messageData }) => {

  useEffect(() => {
    const textInput = document.getElementById("searchText");

    const handleInputChange = (event) => {
      const inputValue = event.detail; // Accessing the correct input value
        // console.log("Input value:", inputValue);
        messageData(inputValue); // Update message data
    };

    if (textInput) {
      textInput.addEventListener("valueChange", handleInputChange);
    }

    return () => {
      if (textInput) {
        textInput.removeEventListener("valueChange", handleInputChange);
      }
    };
  }, [messageData]);

  return (
    <div style={{ width: "300px", padding: "10px" }}>
      <modus-text-input
        placeholder="Search text"
        include-search-icon="false"
        style={{ width: "300px" }}
        id="searchText"
      ></modus-text-input>
    </div>
  );
};

export default GetMessage;
