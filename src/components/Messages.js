import React from "react";
import MessageForm from "./MessageForm";
import MessageItems from "./MessageItems";
import axios from "axios";

class Messages extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3033/messages")
      .then((response) => {
        console.log(response.data);
        this.setState({ messages: response.data });
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  addMessage = (message) => {
    this.setState((prevState) => {
      return {
        messages: prevState.messages.concat(message),
      };
    });
  };
  removedMessage = (id) => {
    this.setState((prevState) => {
      return {
        messages: prevState.messages.filter((msg) => msg.id != id),
      };
    });
  };

  updateMessage = (msg) => {
    this.setState((prevState) => {
      return {
        messages: prevState.messages.map((message) => {
          if (message.id == msg.id) {
            return Object.assign({}, message, msg);
          } else {
            return Object.assign({}, message);
          }
        }),
      };
    });
  };

  render() {
    return (
      <div>
        <h2>My Message Board - {this.state.messages.length}</h2>
        <MessageForm addMessage={this.addMessage} />
        <br />
        <hr width={400} size='6' color='blue' />
        {this.state.messages.reverse().map((msg) => {
          return (
            <div key={msg.id}>
              <MessageItems
                key={msg.id}
                id={msg.id}
                body={msg.body}
                createdAt={msg.createdAt}
                removedMessage={this.removedMessage}
                updateMessage={this.updateMessage}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Messages;
