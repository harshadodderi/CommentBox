import React from "react";
import { Button } from "evergreen-ui";
import axios from "axios";
import { Form } from "antd";
import moment from "moment";
import bootbox from "bootbox";
class MessageItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      body: props.body,
      hover: false,
    };
  }

  handleRemove = () => {
    const confirmRemove = window.confirm("Are you sure?");
    if (confirmRemove) {
      axios
        .delete(`http://localhost:3033/messages/${this.props.id}`)
        .then((response) => {
          console.log(response.data);
          const msg = response.data;
          this.props.removedMessage(msg.id);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  handleEdit = () => {
    this.setState((prevState) => {
      console.log(this.state.editMode);
      return {
        editMode: !prevState.editMode,
      };
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      body: this.state.body,
    };
    axios
      .put(`http://localhost:3033/messages/${this.props.id}`, formData)
      .then((response) => {
        const message = response.data;
        console.log("handleSubmit", response.data);
        this.setState((prevState) => {
          return {
            editMode: !prevState.editMode,
          };
        });
        this.props.updateMessage(message);
      });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleMouseOver = () => {
    this.setState((prevState) => {
      return {
        hover: !prevState.hover,
      };
    });
  };
  handleMouseOut = () => {
    this.setState((prevState) => {
      return {
        hover: !prevState.hover,
      };
    });
  };

  render() {
    return (
      <div span='50%'>
        {this.state.editMode ? (
          <Form>
            <input
              paddingtop={20}
              paddingbottom={20}
              type='text'
              name='body'
              value={this.state.body}
              onChange={this.handleChange}
            />
          </Form>
        ) : (
          <p>{this.props.body}</p>
        )}
        <br />
        <small
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}>
          {this.state.hover
            ? moment(this.props.createdAt).format("MMMM Do YYYY, h:mm:ss a")
            : moment(this.props.createdAt).fromNow()}
        </small>

        <br />

        <Button
          onClick={this.handleRemove}
          appearance='primary'
          iconBefore='trash'
          marginRight={16}
          height={20}
          paddingtop={20}
          paddingbottom={20}
          intent='danger'>
          Remove
        </Button>

        <Button
          appearance='primary'
          paddingtop={20}
          paddingbottom={20}
          marginRight={16}
          height={20}
          iconBefore={this.state.editMode ? "manual" : "edit"}
          onClick={this.state.editMode ? this.handleSubmit : this.handleEdit}>
          {this.state.editMode ? "Update" : "Edit"}
        </Button>
        <hr width={300} size='2' color='black ' />
      </div>
    );
  }
}

export default MessageItems;
