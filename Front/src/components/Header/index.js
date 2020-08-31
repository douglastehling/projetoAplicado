import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import logo from "~/components/Header/icone.png";
import { Wrapper } from "./styles";
import {
  Navbar,
  Row,
  Col,
  Form,
  FormControl,
  Button,
  InputGroup,
  Nav,
} from "react-bootstrap";

import { FiShoppingCart, FiSearch } from "react-icons/fi";

export default function Header() {
  /* const profile = useSelector((state) => state.user.profile); */

  return (
    <Wrapper>
      <div className="shadow-sm p-3 mb-0 bg-white rounded">
        <Row className="mb-1">
          <Col xs={12} md={4}></Col>
          <Col xs={12} md={4} className="text-center">
            <img src={logo} height={35} />
          </Col>
          <Col xs={12} md={4} className="d-flex justify-content-end"></Col>
        </Row>
        <Row>
          <Col>
            <Navbar bg="white" variant="light">
              <Nav className="mx-auto" id="menu">
                <Link className="nav-link" to="/">
                  Home
                </Link>
                {/* <Nav.Link href="/checkout">Carrinho de compras</Nav.Link> */}
                <Link className="nav-link" to="/sales">
                  Todos os pedidos
                </Link>
              </Nav>
            </Navbar>
          </Col>
        </Row>
      </div>
    </Wrapper>
  );
}
