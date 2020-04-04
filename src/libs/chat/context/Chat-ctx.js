import React from "react";
import { useHistory } from "react-router";

import * as api from "libs/chat/chat-apic";

const refreshDuration = parseInt(process.env.REACT_APP_REFRESH_DURATION);

export const ChatContext = React.createContext(null);

export const ChatProvider = ({ children, chatId }) => {

  const history = useHistory();

  const [chat, setChat] = React.useState({ messages: "[]" });

  const [message, setMessage] = React.useState({
    content: ""
  });

  React.useEffect(() => {
    function fetchMessages() {
      api.fetchChat(chatId).then((chat) => {
        setChat(chat);
      }).catch(() => setChat({
        chatId,
        messages: "[]"
      }));
    }

    const inteval = setInterval(fetchMessages, refreshDuration);
    fetchMessages();

    return () => {
      clearInterval(inteval);
    };
  }, [chatId]);

  const sendMessage = async () => {
    setMessage({
      content: ""
    })

    const messageJson = JSON.parse(chat.messages);

    if (messageJson.length>3)
      messageJson.pop();

    await api.saveChat({
      ...chat,
      messages: JSON.stringify([{
        ...message,
        content: btoa(message.content)
      }, ...messageJson])
    });

    history.goBack();
  };

  return (
    <ChatContext.Provider
      value={{
        message,
        setMessage,
        sendMessage,
        chat
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
