import React from "react";

// import { Container } from './styles';
import {
  ButtonGroup,
  DropdownButton,
  Row,
  Col,
  Dropdown,
} from "react-bootstrap";

function DropdownCustom({ title }) {
  return (
    <Row className="mb-2 d-sm-none d-block">
      <Col>
        <DropdownButton
          id="dropdown-basic-button"
          size="sm"
          variant="secondary"
          title={title}
        >
          <Dropdown.Item href="#/Pendente">Pendente</Dropdown.Item>
          <Dropdown.Item href="#/Separando">Separando itens</Dropdown.Item>
          <Dropdown.Item href="#/Aguardando">Aguardando entrega</Dropdown.Item>
          <Dropdown.Item href="#/Processo">Processo de entrega</Dropdown.Item>
          <Dropdown.Item href="#/Entrega">Entrega confirmada</Dropdown.Item>
        </DropdownButton>
      </Col>
    </Row>
  );
}

export default DropdownCustom;
