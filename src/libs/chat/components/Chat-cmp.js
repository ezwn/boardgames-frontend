import React, { useContext } from "react";

import { AppView } from "libs/ezwn-mobile-webui/AppView-cmp";
import { ValidateButton } from "libs/ezwn-mobile-webui/buttons";
import { Localized } from "libs/ezwn-i18n";
import {
  ChatContext,
  ChatProvider,
  decode
} from "../context/Chat-ctx";

import "./Chat-cmp.css";
import { useParams, useHistory } from "react-router";

export const ChatView = props => {

  let { chatId } = useParams();

  return (
    <ChatProvider chatId={chatId}>
      <Chat {...props} />
    </ChatProvider>
  )
};

export const Chat = () => {
  const {
    message,
    setMessage,
    sendMessage,
    chat
  } = useContext(ChatContext);
  
  const history = useHistory();

  const messages = JSON.parse(chat.messages);

  return (
    <AppView
      title={
        <>
          <Localized lang="fr">Options</Localized>
        </>
      }
      bottomBarContent={
        <ValidateButton
          onClick={sendMessage}
          disabled={!message.content}
        />
      }
    >
      <div className="CenterArea Chat">
        {messages.reverse().map((msg, i) => <div className='message' key={i} onClick={history.goBack}>
          {decode(msg.content)}
        </div>)}
        <div className="form">
          <div className="field">
            <div className="input">
              <textarea value={message.content} onChange={event => setMessage({
                content: event.target.value
              })} />
            </div>
          </div>
        </div>
      </div>
    </AppView>
  );
};
