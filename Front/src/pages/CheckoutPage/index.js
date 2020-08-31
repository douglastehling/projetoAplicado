import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "~/services/api";

import { updateQtd, clearCart } from "~/store/modules/cart/actions";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { format } from "date-fns";

import Cards from "react-credit-cards";

import { toast } from "react-toastify";
import { Form, Input, Select } from "@rocketseat/unform";
import { formatPrice } from "~/util/format";
import { Wrapper } from "./styles";

import {
  Container,
  Card,
  InputGroup,
  ListGroup,
  Row,
  Col,
  Alert,
  Button,
  Spinner,
  Image,
  Badge,
} from "react-bootstrap";
import InputMask from "react-input-mask";

import { FiCheck } from "react-icons/fi";

function CheckoutPage() {
  const dispatch = useDispatch();
  const itensCart = useSelector((state) => state.cart.itens);
  const [payed, setPayed] = useState(false);
  const [body, setBody] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
    installments: 1,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [loading, setLoading] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [cupom, setCupom] = useState("");

  async function handlePay(e) {
    const { cliente, cep, cidade, email, endereco, estado, referencia } = e;
    const { expiry, name, installments } = body;
    const cvc = body.cvc.trim();
    const number = body.number.trim();

    if (number !== "4111 1111 1111 1111") {
      toast.error("Cartão inválido");
      return false;
    } else {
      if (cvc !== "123") {
        toast.error("Saldo indisponivel");
        return false;
      }
    }

    let dateExpiry = expiry.trim().split("/");
    dateExpiry[1] =
      Number(dateExpiry[1]) < 2000
        ? Number(dateExpiry[1]) + 2000
        : Number(dateExpiry[1]);
    const newDateExpiry = dateExpiry.join("/");

    setLoading(true);

    const jsonData = {
      orderDate: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      clientName: cliente.trim(),
      address: {
        street: endereco,
        city: cidade,
        state: estado,
        cep,
        note: referencia,
        email,
      },
      paymentStatus: "paid",
      deliveryStatus: "pending",
      value: formatPrice(valorTotal),
      creditCard: { cvc, expiry: newDateExpiry, name, number, installments },
      itens: itensCart.map((x) => ({
        id: x.id,
        quantity: x.quantity,
        excerpt: x.excerpt,
      })),
    };

    try {
      setLoading(true);
      const response = await api.post(`/orderQueues`, jsonData);
      const dataResponse = response.data;
      console.log(dataResponse);

      if (response.status === 201) {
        dispatch(clearCart());
        setPayed(true);
      } else {
        error("Tente novamente");
      }
    } catch (error) {
      error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleUpdateQtd = (item, type) => {
    if (type === "decrease" && item.quantity === 1) {
      confirmAlert({
        title: "Confirme",
        message: `Deseja realmente remover esse item do carrinho?`,
        buttons: [
          {
            label: "Sim",
            onClick: () => {
              dispatch(updateQtd(item.id, type));
            },
          },
          {
            label: "Não",
            onClick: () => {},
          },
        ],
      });
    } else {
      dispatch(updateQtd(item.id, type));
    }
  };

  const checkCupom = () => {
    switch (cupom.toUpperCase()) {
      case "IGTI20":
        toast.success("Desconto de 20% aplicado");
        setDiscountPercent(20);
        break;
      case "IGTI50":
        toast.success("Desconto de 50% aplicado");
        setDiscountPercent(50);
        break;
      case "IGTI80":
        toast.success("Desconto de 80% aplicado");
        setDiscountPercent(80);
        break;
      default:
        toast.error("Cupom inválido");
        setDiscountPercent(0);
        break;
    }
  };

  const soma = useMemo(() => {
    return itensCart.reduce(
      (total, x) => total + x.quantity * x.prices[0].price,
      0
    );
  }, [itensCart]);

  const discount = useMemo(() => {
    return (soma * discountPercent) / 100;
  }, [soma, discountPercent]);

  const valorTotal = useMemo(() => {
    return soma - discount;
  }, [soma, discount]);

  function error(message) {
    toast.error(`Ocorreu um erro com a financeira. ${!!message && message}`);
  }

  return (
    <Wrapper>
      <Card.Body>
        <Row className="justify-content-center">
          <Col sm={6} xs={12} className="mb-5">
            <ListGroup variant="flush">
              {payed ? (
                <Row className="d-flex mt-5 justify-content-center">
                  <Col xs={12} lg={8} className="mb-4">
                    <div className="success-checkmark">
                      <div className="check-icon">
                        <span className="icon-line line-tip"></span>
                        <span className="icon-line line-long"></span>
                        <div className="icon-circle"></div>
                        <div className="icon-fix"></div>
                      </div>
                    </div>
                    <h4 className="text-center">
                      Pagamento realizado com sucesso
                    </h4>
                    <Alert variant="info text-center">
                      Você receberá um e-mail com a confirmação da sua compra.
                    </Alert>
                  </Col>
                </Row>
              ) : !!itensCart && itensCart.length > 0 ? (
                <>
                  <Container>
                    <h2 className="mt-5 mb-2 text-center">
                      Carrinho de compra
                    </h2>
                  </Container>
                  {itensCart.map((x) => (
                    <ListGroup.Item key={x.id} className="bg-light item">
                      <Image
                        src={x.image}
                        height={60}
                        className="shadow-sm p-1 bg-white rounded"
                        roundedCircle
                      />
                      <p className="description">
                        <span id="title">{x.excerpt}</span>
                        <span id="price">
                          {formatPrice(x.quantity * x.prices[0].price)}
                          {" - "}
                          <Badge variant="secondary">
                            {formatPrice(x.prices[0].price)}
                          </Badge>
                        </span>
                      </p>
                      <p className="controls">
                        <span
                          className={`btn-control ${
                            x.quantity > 0 ? "available" : "notAvailable"
                          }`}
                          onClick={() => handleUpdateQtd(x, "decrease")}
                        >
                          -
                        </span>
                        <span className="number-label">{x.quantity}</span>
                        <span
                          className={`btn-control ${
                            x.quantity < x.quantityStock
                              ? "available"
                              : "notAvailable"
                          }`}
                          onClick={() => handleUpdateQtd(x, "increase")}
                        >
                          +
                        </span>
                      </p>
                    </ListGroup.Item>
                  ))}
                  <Form
                    id="formDonation"
                    initialData={{ installments: 1 }}
                    onSubmit={handlePay}
                  >
                    <div className="endereco mt-2">
                      <Card bg={"light"} text={"dark"} className="mb-2">
                        <Card.Header>Endereço para entrega</Card.Header>
                        <Card.Body>
                          <Row>
                            <Col>
                              <div className="form-group">
                                <label htmlFor="exampleFormControlNome">
                                  Nome completo*
                                </label>
                                <Input
                                  type="text"
                                  placeholder="Digite seu nome"
                                  name="cliente"
                                  required
                                  className="form-control"
                                  id="exampleFormControlNome"
                                />
                              </div>
                            </Col>
                            <Col>
                              <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">
                                  E-mail*
                                </label>
                                <Input
                                  type="email"
                                  placeholder="Digite o e-mail"
                                  name="email"
                                  required
                                  className="form-control"
                                  id="exampleFormControlInput1"
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <div className="form-group">
                                <label htmlFor="formGridAddress1">
                                  Endereço*
                                </label>
                                <Input
                                  type="text"
                                  required
                                  name="endereco"
                                  placeholder="Avenida Amazonas, 1234"
                                  className="form-control"
                                  id="formGridAddress1"
                                />
                              </div>
                            </Col>
                            <Col>
                              <div className="form-group">
                                <label htmlFor="formGridReference">
                                  Ponto de referência
                                </label>
                                <Input
                                  type="text"
                                  name="referencia"
                                  placeholder="Ao lado do posto de gasolina"
                                  className="form-control"
                                  id="formGridReference"
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <div className="form-group">
                                <label htmlFor="formGridCity">Cidade*</label>
                                <Input
                                  type="text"
                                  required
                                  name="cidade"
                                  placeholder="Belo Horizonte"
                                  className="form-control"
                                  id="formGridCity"
                                />
                              </div>
                            </Col>
                            <Col>
                              <div className="form-group">
                                <label htmlFor="formGridState">Estado*</label>
                                <Input
                                  type="text"
                                  required
                                  name="estado"
                                  placeholder="Minas Gerais"
                                  className="form-control"
                                  id="formGridState"
                                />
                              </div>
                            </Col>
                            <Col>
                              <div className="form-group">
                                <label htmlFor="formGridZip">CEP*</label>
                                <Input
                                  type="text"
                                  required
                                  name="cep"
                                  placeholder="30000-000"
                                  className="form-control"
                                  id="formGridZip"
                                />
                              </div>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </div>
                    <div className="cupom-desconto row mt-3 mr-0">
                      <span className="mr-2 desc">Cupom de desconto: </span>
                      <input
                        type="text"
                        className="input-check"
                        placeholder="CUPOM"
                        value={cupom}
                        onChange={(e) => setCupom(e.target.value)}
                      />
                      <span className="btn-check" onClick={checkCupom}>
                        <FiCheck />
                      </span>
                    </div>
                    <div className="cartao mt-4">
                      <Container>
                        <div id="PaymentForm">
                          <Row className="justify-content-center">
                            <Col
                              xs={12}
                              sm={12}
                              md={12}
                              lg={6}
                              className="mb-4"
                            >
                              <Cards
                                cvc={body.cvc}
                                expiry={body.expiry}
                                focused={body.focus}
                                name={body.name}
                                number={body.number}
                              />
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={6} className="">
                              <Row className=" justify-content-center">
                                <Col xs={12} md={8} lg={12}>
                                  <InputGroup className="mb-3">
                                    <Input
                                      type="text"
                                      name="name"
                                      className="form-control"
                                      placeholder="Nome no cartão"
                                      required
                                      onChange={(e) =>
                                        setBody({
                                          ...body,
                                          name: e.target.value,
                                        })
                                      }
                                      onFocus={(e) =>
                                        setBody({
                                          ...body,
                                          focus: e.target.value,
                                        })
                                      }
                                    />
                                  </InputGroup>
                                </Col>
                                <Col xs={12} md={8} lg={12}>
                                  <InputGroup className="mb-3">
                                    <InputMask
                                      mask="9999 9999 9999 9999 9999"
                                      maskChar=" "
                                      className="form-control"
                                      type="tel"
                                      name="number"
                                      value={body.number}
                                      placeholder="Numero do cartão **** **** **** ****"
                                      required
                                      onChange={(e) =>
                                        setBody({
                                          ...body,
                                          number: e.target.value,
                                        })
                                      }
                                      onFocus={(e) =>
                                        setBody({
                                          ...body,
                                          focus: e.target.value,
                                        })
                                      }
                                    />
                                  </InputGroup>
                                </Col>
                                <Col xs={12} md={8} lg={12}>
                                  <InputGroup className="mb-3">
                                    <InputMask
                                      mask="9999"
                                      maskChar=" "
                                      type="tel"
                                      className="form-control"
                                      name="cvc"
                                      value={body.cvc}
                                      placeholder="CVC"
                                      required
                                      onChange={(e) =>
                                        setBody({
                                          ...body,
                                          cvc: e.target.value,
                                        })
                                      }
                                      onFocus={(e) =>
                                        setBody({
                                          ...body,
                                          focus: e.target.value,
                                        })
                                      }
                                    />
                                  </InputGroup>
                                </Col>
                                <Col xs={12} md={8} lg={12}>
                                  <InputGroup className="mb-3">
                                    <InputMask
                                      mask="99/9999"
                                      maskChar=" "
                                      type="tel"
                                      name="expiry"
                                      value={body.expiry}
                                      className="form-control"
                                      placeholder="Vencimento mm/aaaa"
                                      required
                                      onChange={(e) =>
                                        setBody({
                                          ...body,
                                          expiry: e.target.value,
                                        })
                                      }
                                      onFocus={(e) =>
                                        setBody({
                                          ...body,
                                          focus: e.target.value,
                                        })
                                      }
                                    />
                                  </InputGroup>
                                </Col>

                                <Col xs={12} md={8} lg={12}>
                                  <InputGroup className="mb-3">
                                    <Select
                                      name="installments"
                                      required
                                      placeholder="Quantas parcelas"
                                      className="form-control"
                                      options={[
                                        { id: "1", title: "1x" },
                                        { id: "2", title: "2x" },
                                        { id: "3", title: "3x" },
                                        { id: "4", title: "4x" },
                                        { id: "5", title: "5x" },
                                        { id: "6", title: "6x" },
                                      ]}
                                      onChange={(e) =>
                                        setBody({
                                          ...body,
                                          installments: e.target.value,
                                        })
                                      }
                                    />
                                  </InputGroup>
                                </Col>

                                <Col xs={12} sm={8} className="mb-1 mt-1">
                                  <h6>Subtotal: {formatPrice(soma)}</h6>
                                  <h6
                                    className={`text-danger ${
                                      discountPercent === 0
                                        ? "d-none"
                                        : "d-block"
                                    }`}
                                  >
                                    Desconto: {formatPrice(discount)}
                                  </h6>
                                  <h5 className="text-info">
                                    <strong>Total:</strong>{" "}
                                    {formatPrice(valorTotal)}
                                  </h5>
                                </Col>
                                <Col xs={12} md={8} lg={12}>
                                  <Button
                                    type="submit"
                                    variant="success"
                                    block
                                    disabled={loading}
                                  >
                                    {loading ? (
                                      <Spinner animation="border" />
                                    ) : (
                                      <>
                                        <FiCheck size="25" /> Processar
                                        Pagamento
                                      </>
                                    )}
                                  </Button>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </div>
                      </Container>
                    </div>
                  </Form>
                </>
              ) : (
                <ListGroup.Item className="bg-light text-center">
                  <h5>Carrinho vazio</h5>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Col>
        </Row>
      </Card.Body>
    </Wrapper>
  );
}
export default CheckoutPage;
