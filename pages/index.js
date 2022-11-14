import react, { Component } from "react";
import factoryInstance from "../ethereum/factory";
import { Card, Button, Container } from "semantic-ui-react";
import Layout from "../component/layout";
import { Link } from "../routes";

class campaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factoryInstance.methods
      .getDeployedCampaigns()
      .call();
    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>CLICK ME</a>
          </Link>
        ),
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <Container>
          <h3>
            <u>Campaigns</u>
          </h3>
          <Link route="/campaigns/new">
            <a>
              <Button
                primary
                floated="right"
                content="Create Campaign"
                icon="add"
                labelPosition="right"
              />
            </a>
          </Link>
          {this.props.campaigns.length === 0 && (
            <p>There&apos;re no active campaigns!</p>
          )}
          {this.props.campaigns.length > 0 && (
            <div>{this.renderCampaigns()}</div>
          )}
        </Container>
      </Layout>
    );
  }
}

export default campaignIndex;
