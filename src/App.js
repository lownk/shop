import React, { useState } from "react";
import "./App.css";
import { Button, Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import Data from "./data.js";
import Card from "./Card.js";
import Jumbotron from "./Jumbotron.js";
import Detail from "./Detail.js";
import axios from "axios";
import Loading from "./Loading.js";

import { Link, Route, Switch } from "react-router-dom";

function App() {
  let [data, data변경] = useState(Data);
  let [클릭횟수, 클릭횟수변경] = useState(1);

  return (
    <div>
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/detail">
                  Detail
                </Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      <Route exact path="/">
        <Jumbotron />

        <div className="container">
          <div className="row">
            {data.map((a, i) => {
              return <Card data={data[i]} i={i} key={i} />;
            })}
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              클릭횟수변경(클릭횟수 + 1);
              console.log(클릭횟수);
              // <Loading />;
              axios
                .get(
                  `https://codingapple1.github.io/shop/data${클릭횟수 + 1}.json`
                )
                .then((result) => {
                  // 로딩중이라는 ui안보이게처리
                  data변경([...data, ...result.data]);
                })
                .catch(() => {
                  // 로딩중이라는 ui안보이게처리
                  console.log("실패했어요.." + 클릭횟수);
                });
            }}
          >
            더보기
          </button>
        </div>
      </Route>

      <Route path="/detail/:id">
        <Detail data={data} />
      </Route>
    </div>
  );
}

export default App;
