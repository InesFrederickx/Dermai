import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { DIALOGFLOW_OAUTH2_TOKEN } from "@env";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input) return;

    const userMessage = { text: input, sender: "You" };
    setMessages([...messages, userMessage]);

    const url = `https://dialogflow.googleapis.com/v3/projects/dermai-433712/locations/europe-west1/agents/53e68307-9e16-421a-abb0-2c18435d4b17/sessions/${DIALOGFLOW_OAUTH2_TOKEN}:detectIntent`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${DIALOGFLOW_OAUTH2_TOKEN}`,
          "Content-Type": "application/json",
          "x-goog-user-project": "your-project-id",
        },
        body: JSON.stringify({
          queryInput: {
            text: {
              text: input,
              languageCode: "en",
            },
          },
        }),
      });

      const data = await response.json();

      console.log("Dialogflow response:", JSON.stringify(data, null, 2));

      if (data.queryResult) {
        const botMessage = {
          text:
            data.queryResult.fulfillmentText ||
            "I didn’t understand that. Can you try rephrasing?",
          sender: "DermAI",
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "I am down at the moment. Try me again later.",
            sender: "DermAI",
          },
        ]);
      }
    } catch (error) {
      console.error("Error communicating with Dialogflow:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Error communicating with Dialogflow.", sender: "DermAI" },
      ]);
    }

    setInput("");
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.messageContainer}>
        {messages.map((message, index) => (
          <View key={index} style={styles.message}>
            <Text
              style={{
                fontWeight: message.sender === "You" ? "bold" : "normal",
              }}
            >
              {message.sender}: {message.text}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
          style={styles.input}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  messageContainer: {
    flex: 1,
    marginBottom: 16,
  },
  message: {
    marginVertical: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    padding: 10,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: "#f57c00",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Chatbot;
