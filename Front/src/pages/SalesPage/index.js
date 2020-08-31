import React, { useState, useEffect } from "react";

import api from "~/services/api";
import axios from "axios";
import { toast } from "react-toastify";

import { Wrapper } from "./styles";
import { Container, Card, Spinner, Row, Col, Button } from "react-bootstrap";
import { Form, Input } from "@rocketseat/unform";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { format } from "date-fns";

import Board, { moveCard } from "@lourenci/react-kanban";

import DropdownCustom from "~/components/DropdownCustom";
import { BsXCircle, BsClock } from "react-icons/bs";
import { FiTrello } from "react-icons/fi";

function UncontrolledBoard({ board }) {
  const boardsName = [
    "pending",
    "separatingItems",
    "awaitingDelivery",
    "deliveryProcess",
    "confirmedDelivery",
  ];
  const statusPayment = new Map();
  statusPayment.set("paid", "Pago");
  statusPayment.set("awaitPayment", "Aguardando Pagamento");

  return (
    <Board
      allowRemoveLane
      //allowRenameColumn
      //allowRemoveCard
      disableColumnDrag
      onLaneRemove={console.log}
      onCardRemove={(a, b, c, d, e) => {
        const { id } = c;
        const responseDeleteCard = api.put(`/orderQueues/${id}`);
      }}
      onLaneRename={console.log}
      onCardDragEnd={(a, b, c, d, e) => {
        const newCard = b;
        newCard.deliveryStatus = boardsName[d.toColumnId - 1];
        const responseUpdateCard = api.put(
          `/orderQueues/${newCard.id}`,
          newCard
        );
      }}
      initialBoard={board}
      //allowAddCard={{ on: "top" }}
      onNewCardConfirm={(draftCard) => ({
        id: new Date().getTime(),
        ...draftCard,
      })}
      onCardNew={console.log}
      renderCard={(
        { address, itens, clientName, paymentStatus, orderDate },
        { removeCard, dragging }
      ) => (
        <Card
          border="light"
          className="mt-2"
          style={{ width: "16rem" }}
          //dragging={dragging}
        >
          <Card.Header className="cardTitle">
            <h6>{clientName}</h6>
            <BsXCircle className="excludeBtn" onClick={removeCard} size={16} />
          </Card.Header>
          <Card.Body>
            <span
              className={`badge mb-2 py-1 ${
                paymentStatus === "paid" ? "badge-success" : "badge-warning"
              }`}
            >
              {statusPayment.get(paymentStatus)}
            </span>
            <DropdownCustom title="Pendente" />
            <h6 className="card-title">
              {address.street}, {address.city}, {address.state}, {address.cep}
            </h6>
            <h6 className="card-subtitle mb-2 text-muted">{address.note}</h6>

            {itens && (
              <ul className="mt-2">
                {itens.map((x, i) => (
                  <li key={i}>
                    <strong>{x.quantity}</strong> - {x.excerpt}
                  </li>
                ))}
              </ul>
            )}
            {orderDate && (
              <p className="card-text">
                <small className="text-muted">
                  <BsClock className="mr-2 clockIcon" />
                  {format(new Date(orderDate), "dd/MM/yyyy HH:mm:ss")}
                </small>
              </p>
            )}
          </Card.Body>
        </Card>
      )}
    />
  );
}

function SalesPage() {
  const [board, setBoard] = useState({
    columns: [
      {
        id: 1,
        title: "Pendentes",
        cards: [],
      },
      {
        id: 2,
        title: "Separando itens",
        cards: [],
      },
      {
        id: 3,
        title: "Aguardando entrega",
        cards: [],
      },
      {
        id: 4,
        title: "Processo de entrega",
        cards: [],
      },
      {
        id: 5,
        title: "Entrega confirmada",
        cards: [],
      },
    ],
  });
  const [loaded, setLoaded] = useState(false);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const order = "&_sort=orderDate&_order=asc";
    const load = async () => {
      await axios
        .all([
          api.get(`/orderQueues?deliveryStatus=pending${order}`),
          api.get(`/orderQueues?deliveryStatus=separatingItems${order}`),
          api.get(`/orderQueues?deliveryStatus=awaitingDelivery${order}`),
          api.get(`/orderQueues?deliveryStatus=deliveryProcess${order}`),
          api.get(`/orderQueues?deliveryStatus=confirmedDelivery${order}`),
        ])
        .then(
          axios.spread((...responses) => {
            const pending = responses[0].data;
            const separatingItems = responses[1].data;
            const awaitingDelivery = responses[2].data;
            const deliveryProcess = responses[3].data;
            const confirmedDelivery = responses[4].data;
            setBoard({
              columns: [
                {
                  id: 1,
                  title: "Pendentes",
                  cards: pending,
                },
                {
                  id: 2,
                  title: "Separando itens",
                  cards: separatingItems,
                },
                {
                  id: 3,
                  title: "Aguardando entrega",
                  cards: awaitingDelivery,
                },
                {
                  id: 4,
                  title: "Processo de entrega",
                  cards: deliveryProcess,
                },
                {
                  id: 5,
                  title: "Entrega confirmada",
                  cards: confirmedDelivery,
                },
              ],
            });
            setLoaded(true);
          })
        )
        .catch((errors) => {
          toast.error("Erro ao carregar os dados");
        });
    };
    load();
  }, []);

  const handleLogin = (formData) => {
    const { user, pass } = formData;
    if (user === "admin" && pass === "admin") {
      setLogged(true);
    } else {
      toast.error("Usuário ou senha inválido");
    }
  };

  return (
    <Wrapper>
      {logged ? (
        <>
          <Container>
            <h2 className="mt-5 mb-2 text-center">Vendas Realizadas</h2>
          </Container>
          <Card.Body>
            {loaded ? (
              <UncontrolledBoard board={board} />
            ) : (
              <div className="mt-3 d-flex justify-content-center  align-items-center">
                <Spinner animation="border" variant="secondary" size="sm" />
                <h5 className="mb-0 ml-1">Carregando</h5>
              </div>
            )}
          </Card.Body>
        </>
      ) : (
        <Row>
          <Col className="d-flex justify-content-center">
            <Card
              bg={"light"}
              text={"dark"}
              style={{ width: "25rem" }}
              className="mb-2 mt-5"
            >
              <Card.Header>Login</Card.Header>
              <Card.Body>
                <Form onSubmit={handleLogin}>
                  <Input name="user" className="form-control mb-2" />
                  <Input
                    name="pass"
                    className="form-control mb-2"
                    type="password"
                  />
                  <Button type="submit" variant="primary" block>
                    Logar
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Wrapper>
  );
}

export default SalesPage;
