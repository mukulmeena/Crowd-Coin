import react, { Component } from "react";
import web3 from "../../../ethereum/web3";
import factoryInstance from "../../../ethereum/factory";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../../component/layout";
import { Router } from "../../../routes";

class CampaignNew extends Component {
  state = {
    minimumContribution: "",
    errorMessage: "",
    loading: false,
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      await factoryInstance.methods
        .createCampaign(this.state.minimumContribution)
        .send({ from: accounts[0] });

      Router.pushRoute("/");
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <div>
          <h3>Create a Campaign</h3>
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Field>
              <label>Minimum Contribution</label>
              <Input
                value={this.state.minimumContribution}
                onChange={(event) => {
                  this.setState({ minimumContribution: event.target.value });
                }}
                label="ether"
                placeholder="Enter the amount"
                labelPosition="right"
              ></Input>
            </Form.Field>

            <Message error header="Oops!" content={this.state.errorMessage} />
            <Button
              loading={this.state.loading}
              primary
              content="Create!"
            ></Button>
          </Form>
        </div>
      </Layout>
    );
  }
}

export default CampaignNew;
