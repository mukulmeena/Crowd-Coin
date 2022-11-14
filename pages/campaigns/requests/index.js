import React, { Component } from "react";
import { Table, Button, Container, Grid } from "semantic-ui-react";
import Layout from "../../../../component/layout";
import Contribute from "../../../../component/contribute";
import { Link } from "../../../../routes";
import Campaign from "../../../../ethereum/campaign";
import web3 from "../../../../ethereum/web3";
import RequestRow from "../../../../component/requestRow";

class Requests extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;

    const campaign = Campaign(address);
    const manager = await campaign.methods.manager().call();
    const requestCount = await campaign.methods.getRequestsCount().call();
    const approverCount = await campaign.methods.approversCount().call();
    const accounts = await web3.eth.getAccounts();

    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call();
        })
    );

    return {
      address,
      requests,
      requestCount,
      approverCount,
      manager,
      accounts,
    };
  }

  renderRequest() {
    return this.props.requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          Id={index}
          request={request}
          address={this.props.address}
          approvers={this.props.approverCount}
        />
      );
    });
  }

  render() {
    return (
      <Layout>
        <h3>Pending Requests</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button
              onClick={this.onClick}
              primary
              floated="right"
              style={{ marginBottom: 10 }}
            >
              Add Request
            </Button>
          </a>
        </Link>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>Recipient</Table.HeaderCell>
              <Table.HeaderCell>Approval Count</Table.HeaderCell>
              <Table.HeaderCell>Approve</Table.HeaderCell>
              <Table.HeaderCell>Finalize</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {this.props.requests.length === 0 && (
            <p>No requests made by the manager!</p>
          )}
          {this.props.requests.length > 0 && (
            <Table.Body>{this.renderRequest()}</Table.Body>
          )}
        </Table>
      </Layout>
    );
  }
}

export default Requests;
