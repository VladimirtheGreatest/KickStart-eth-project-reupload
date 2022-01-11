import React, { Component } from "react";
import { Button, Header, Table } from "semantic-ui-react";
import { Link } from "../../../routes";
import Layout from "../../../components/Layout";
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();
    //solidity doesnt support returning arrays of structs so we get the lenght of request then call them one by one by index
    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call();
        })
    );

    return { address, requests, requestCount, approversCount };
  }

  renderRows() {
    return this.props.requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          address={this.props.address}
          approversCount={this.props.approversCount}
        />
      );
    });
  }
  render() {
    const { Row, HeaderCell, Body } = Table;
    return (
      <Layout>
        <Header as="h2" color="violet">
          Requests
        </Header>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button
              style={{ marginBottom: 10 }}
              floated="right"
              inverted
              color="blue"
              size="massive"
            >
              Add Request
            </Button>
          </a>
        </Link>
        <Table>
          <Table.Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Table.Header>
          <Body>{this.renderRows()}</Body>
        </Table>
        <Header as="h2" color="violet">
          Found {this.props.requestCount} requests.
        </Header>
      </Layout>
    );
  }
}

export default RequestIndex;
