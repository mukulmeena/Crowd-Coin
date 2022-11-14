import React, { Component } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../../component/layout";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";

class addRequest extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    return { address };
  }

  state = {
    description: "",
    amount: "",
    recipient: "",
    loading: false,
    errorMessage: "",
  };

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: "" });

    const { description, amount, recipient } = this.state;

    const accounts = await web3.eth.getAccounts();
    const campaign = Campaign(this.props.address);

    try {
      await campaign.methods
        .createRequest(
          description,
          web3.utils.toWei(amount, "ether"),
          recipient
        )
        .send({ from: accounts[0] });

        Router.pushRoute(`/campaigns/${this.props.address}/requests`)
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <Link route={`/campaigns/${this.props.address}/requests`}>
          <a>Back</a>
        </Link>
        <h3>Create a Request</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field width={5}>
            <lable>Description</lable>
            <Input
              value={this.state.description}
              onChange={(event) =>
                this.setState({ description: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field width={5}>
            <lable>Amount in Ether</lable>
            <Input
              label="Ether"
              labelPosition="right"
              value={this.state.amount}
              onChange={(event) =>
                this.setState({ amount: event.target.value })
              }
            />
          </Form.Field>

          <Form.Field width={5}>
            <lable>Recipient</lable>
            <Input
              value={this.state.recipient}
              onChange={(event) =>
                this.setState({ recipient: event.target.value })
              }
            />
          </Form.Field>
          <Message
            error
            header="Oops!"
            content={this.state.errorMessage}
          ></Message>
          <Button primary content="Create" loading={this.state.loading} />
        </Form>
      </Layout>
    );
  }
}

export default addRequest;
