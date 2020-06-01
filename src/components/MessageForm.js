import React from "react";
import { Button } from "evergreen-ui";
import { Textarea } from "evergreen-ui";
import axios from "axios";

class MessageForm extends React.Component {
  constructor() {
    super();
    this.state = {
      body: "",
    };
  }
  handleChangeBody = (e) => {
    this.setState({ body: e.target.value });
    console.log(this.state.body);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      body: this.state.body,
    };
    axios
      .post("http://localhost:3033/messages", formData)
      .then((response) => {
        console.log(response.data);
        const message = response.data;
        this.props.addMessage(message);
        this.setState({ body: "" });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Textarea
            name='textarea-1'
            width='45%'
            placeholder='Message here ....'
            value={this.state.body}
            name='body'
            onChange={this.handleChangeBody}
          />
          <br />
          <br />
          <Button
            appearance='primary'
            marginRight={16}
            paddingBottom='20'
            paddingTop='20'>
            Add message
          </Button>
        </form>
      </div>
    );
  }
}

export default MessageForm;
