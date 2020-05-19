import React, { useEffect, useState } from "react";
import { Table, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [bitdata, setBitdata] = useState([]);

  async function callApi() {
    const res = await fetch("https://api.coinlore.net/api/tickers/");
    res
      .json()
      .then((res) => {
        setBitdata(res.data);
      })
      .then((err) => err);
  }

  useEffect(() => {
    callApi();
  }, []);

  const renderTags = () => {
    let body = bitdata.map((r) => {
      return (
        <tr>
          <td>{r.rank}</td>
          <td className="td-name">
            {r.name} <span>{r.symbol}</span>
          </td>
          <td>$ {r.price_usd}</td>
          <td>$ {r.market_cap_usd}</td>
          <td className="td-percent">{r.percent_change_24h}%</td>
          <td className="td-percent">{r.percent_change_1h}%</td>
          <td>{r.volume24}</td>
        </tr>
      );
    });
    return (
      <Table responsive striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Price USD</th>
              <th>Market Cap</th>
              <th>Percent Change 24hr</th>
              <th>Percent Change 1hr</th>
              <th>Volume 24</th>
            </tr>
          </thead>
          <tbody>{body}</tbody>
        </Table>
    );
  };

  return (
    <Container>
      <Row className="Row">
        <h1>Crypto Check</h1>
      </Row>
      <Row>
        {renderTags()}
      </Row>
    </Container>
  );
}

export default App;
