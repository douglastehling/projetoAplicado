import React, { useEffect, useState } from "react";

import { Wrapper } from "./styles";
import TableList from "~/components/TableList";
import { Container, Row, Col, Button, Navbar, Modal } from "react-bootstrap";
import api from "~/services/api";

import { Form, Input } from "@rocketseat/unform";

export default function ContactsPage() {
  const [modalShow, setModalShow] = useState(false);
  const [contacts, setContacts] = useState([]);

  useEffect(async () => {
    const response = await api.get(`/contacts`);
    const data = response.data;
    setContacts(data);
  }, []);

  const handleInsertContact = async (data) => {
    const response = await api.post(`/contacts`, data);
    setContacts((prevState) => [...prevState, response.data]);
    setModalShow(false);
  };

  const removeBook = async (id) => {
    const response = await api.delete(`/contacts/${id}`);
    setContacts((prevState) => prevState.filter((x) => x.id !== id));
  };

  return (
    <>
      <Wrapper>
        <Row>
          <Col>
            <Navbar bg="dark" variant="dark">
              <Container>
                <Navbar.Brand href="#home" className="mr-auto">
                  Agenda{" "}
                </Navbar.Brand>

                <Button onClick={() => setModalShow(true)}>inserir</Button>
              </Container>
            </Navbar>
          </Col>
        </Row>
        <Container>
          <Row className="pt-5">
            <Col>
              <TableList itens={contacts} removeBook={removeBook} />
            </Col>
          </Row>
        </Container>
      </Wrapper>

      <Modal
        size="md"
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="example-modal-sizes-title-md"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-md">
            Inserir contato
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleInsertContact}>
            <Input
              type="text"
              name="name"
              required
              className="form-control mb-3"
              placeholder="Nome"
            />
            <Input
              type="text"
              name="email"
              required
              className="form-control mb-3"
              placeholder="E-mail"
            />
            <Input
              type="text"
              name="phone"
              required
              className="form-control mb-3"
              placeholder="Telefone"
            />
            <Input
              type="text"
              name="address"
              required
              className="form-control mb-3"
              placeholder="Endereço"
            />
            <Button type="submit" variant="success">
              Salvar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
