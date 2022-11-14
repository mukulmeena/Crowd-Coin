import React, { Component } from "react";
import { Button, Table, Message } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";
import { Link, Router } from "../routes";

class RequestRow extends Component {
  state = {
    loadingApprove: false,
    loadingFinalize: false,
    errorMessage: ""
  };

  onApprove = async () => {
    this.setState({ loadingApprove: true });

    const accounts = await web3.eth.getAccounts();
    const campaign = Campaign(this.props.address);
    try {
      await campaign.methods
        .approveRequest(this.props.Id)
        .send({ from: accounts[0] });

      Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    } catch (err) {}

    this.setState({ loadingApprove: false });
  };

  onFinalize = async () => {
    this.setState({ loadingFinalize: true });

    const accounts = await web3.eth.getAccounts();
    const campaign = Campaign(this.props.address);
    try {
      await campaign.methods
        .finalizeRequest(this.props.Id)
        .send({ from: accounts[0] });
      Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    } catch (err) {}

    this.setState({ loadingFinalize: false });
  };

  render() {
    const { Row, Cell } = Table;
    const { Id, request, approvers } = this.props;
    const readyToFinalize = request.approvalCount > approvers / 2 

    return (
      <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
        <Cell>{Id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value)}</Cell>
        <Cell>{request.recipient.slice(0, 5)}</Cell>
        <Cell>
          {request.approvalCount}/{approvers}
        </Cell>
        <Cell>
          {request.complete ? null : (
            <Button 
              loading={this.state.loadingApprove}
              positive
              basic
              content="Approve"
              onClick={this.onApprove}
            />
          )}
        </Cell>
        <Cell>
          {request.complete ? null : (
            <Button
              color="red"
              basic
              loading={this.state.loadingFinalize}
              content="Finalize"
              onClick={this.onFinalize}
            />
          )}
        </Cell>
      </Row>
    );
  }
}
export default RequestRow;
