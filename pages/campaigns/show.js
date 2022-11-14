import React, { Component, Fragment } from "react";
import { Button, Card, Grid, GridColumn, Input } from "semantic-ui-react";
import Layout from "../../../component/layout";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import Contribute from "../../../component/contribute";
import { Link } from "../../../routes";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestCount: summary[2],
      approverCount: summary[3],
      manager: summary[4],
    };
  }

  renderCards() {
    const {
      minimumContribution,
      balance,
      requestCount,
      approverCount,
      manager,
    } = this.props;

    const items = [
      {
        header: manager,
        description:
          "This is the creator of campaign and can withdraw money using request.",
        meta: "Address of manager",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minimumContribution,
        description: "Contribution must be greator then this amount!",
        meta: "Minimum Contribution(wei)",
        style: { overflowWrap: "break-word" },
      },
      {
        header: requestCount,
        description: "Total Number of requests raised by the manager.",
        meta: "Number of Requests",
        style: { overflowWrap: "break-word" },
      },
      {
        header: approverCount,
        description:
          "Number of people who have already contributed to this campaign.",
        meta: "Number of approvers",
        style: { overflowWrap: "break-word" },
      },
      {
        header: web3.utils.fromWei(balance),
        description: "The balance is how much money this Campaign has left.",
        meta: "Campaign Balance(ether)",
        style: { overflowWrap: "break-word" },
      },
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Campaign Details</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
            <Grid.Column width={6}>
              <Contribute address={this.props.address} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
