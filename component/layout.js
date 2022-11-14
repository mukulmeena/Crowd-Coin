import React from "react";
// import {Header, Button, Segment} from "semantic-ui-react"
import { Container } from "semantic-ui-react";
import Header from "./header";
import Head from "next/head";

const layout = (props) => {
  return (
    <Container style={{ marginTop: 20 }}>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
        />
      </Head>
      <Header />
      {props.children}
    </Container>
  );
};
export default layout;
