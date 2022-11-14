import { Router } from "../routes"
import React, { Component } from "react";
import {Button, Form, Input, Message } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";

class Contribute extends Component {
  state = {
    contribute: "",
    errorMessage: "",
    loading: false
  };

  OnSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: ""});

    const accounts = await web3.eth.getAccounts();
    const campaign = Campaign(this.props.address);
    try {
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.contribute, "ether"),
      });

      Router.replaceRoute(`/campaigns/${this.props.address}`)
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ contribute: '' })
    this.setState({ loading: false });
  };

  render() {
    return (
      <Form onSubmit={this.OnSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Amount to Contribute</label>
          <Input
            placeholder='Enter the amount'
            value={this.state.contribute}
            onChange={(event) =>
              this.setState({ contribute: event.target.value })
            }
            label="Ether"
            labelPosition="right"
          />
        </Form.Field>
        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button loading={this.state.loading} primary content="Contribute!" />
      </Form>
    );
  }
}

export default Contribute;
