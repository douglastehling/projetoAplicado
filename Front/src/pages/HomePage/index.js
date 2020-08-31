import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "~/services/api";
import buildURLQuery from "~/util/buildURLQuery";

import { addItem } from "~/store/modules/cart/actions";

import { formatPrice } from "~/util/format";
import { Wrapper, Checkout } from "./styles";
import {
  Form,
  FormControl,
  InputGroup,
  Container,
  Card,
  Image,
  Carousel,
  Row,
  Col,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

import { FiShoppingCart, FiSearch } from "react-icons/fi";
import { BsCardChecklist } from "react-icons/bs";

function HomePage() {
  const dispatch = useDispatch();
  const itensCart = useSelector((state) => state.cart.itens);

  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);

  const [searchString, setSearchString] = useState("");
  const [timeout, setTimeOut] = useState(0);

  useEffect(() => {
    const load = async () => {
      const responseSetting = await api.get(`/setting`);
      setBanners(responseSetting.data.banner);

      const response = await api.get(
        `/products?${buildURLQuery({ q: searchString })}`
      );
      const data = response.data.map((x) => {
        const find = itensCart.find((y) => x.id == y.id);
        if (!!find) {
          return { ...x, quantity: find.quantity };
        } else {
          return { ...x };
        }
      });

      setProducts(data);
    };
    load();
  }, [searchString]);

  const handleFind = (e) => {
    const vl = e.target.value;

    if (timeout) clearTimeout(timeout);
    setTimeOut(
      setTimeout(() => {
        setSearchString(vl);
      }, 400)
    );
  };

  const hasProduct = useMemo(() => {
    return !!products.find((x) => x.quantity > 0);
  }, [products]);

  const updateQtd = (id, type) => {
    setProducts(
      products.map((x) => {
        if (x.id == id) {
          return {
            ...x,
            quantity:
              type == "increase"
                ? x.quantity < x.quantityStock
                  ? x.quantity + 1
                  : x.quantity
                : x.quantity > 0
                ? x.quantity - 1
                : x.quantity,
          };
        } else {
          return { ...x };
        }
      })
    );
  };

  const handleCheckout = () => {
    const itensCheckout = products.filter((x) => x.quantity > 0);
    dispatch(addItem(itensCheckout));
  };

  return (
    <Wrapper>
      <Carousel>
        {banners.map((x) => (
          <Carousel.Item key={x.id}>
            <img className="d-block w-100" src={x.src} alt="First slide" />
          </Carousel.Item>
        ))}
      </Carousel>
      <Container>
        <Row className="my-5">
          <Col></Col>
          <Col>
            <h2 className="text-center">Produtos</h2>
          </Col>
          <Col>
            <Form inline>
              <InputGroup className="mb-1">
                <FormControl
                  type="text"
                  placeholder="Pesquisar..."
                  onChange={handleFind}
                  aria-describedby="basic-addon2"
                />
                <InputGroup.Append>
                  <InputGroup.Text>
                    <FiSearch />
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Form>
          </Col>
        </Row>

        <div className="mb-5">
          <Row className="d-flex justify-content-center">
            <Col sm={10} xs={12}>
              <Row>
                {products.map((x) => (
                  <Col lg={3} md={4} sm={6} xs={6} key={x.id}>
                    <Card className="mb-4" bg="light">
                      <Card.Img variant="top" src={x.image} />
                      <Card.Body>
                        <Card.Title>{x.excerpt}</Card.Title>
                        <Card.Subtitle className="mb-2 font-weight-bold text-success">
                          {formatPrice(x.prices[0].price)}
                        </Card.Subtitle>
                        <Card.Text>{x.quantityStock} em estoque</Card.Text>
                        <p className="controls">
                          <span
                            className={`btn-control ${
                              x.quantity > 0 ? "available" : "notAvailable"
                            }`}
                            onClick={() => updateQtd(x.id, "decrease")}
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
                            onClick={() => updateQtd(x.id, "increase")}
                          >
                            +
                          </span>
                        </p>
                        {/* <Row
                          className={`mt-2 ${
                            x.quantity > 0 ? "d-block" : "d-none"
                          }`}
                        >
                          <Col>
                            <Button block size="sm">
                              Adicionar
                            </Button>
                          </Col>
                        </Row> */}
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </div>
      </Container>
      <OverlayTrigger
        placement={"top"}
        overlay={<Tooltip id={`tooltip-${"top"}`}>Finalizar compra</Tooltip>}
      >
        <Checkout
          onClick={hasProduct ? handleCheckout : null}
          hasProduct={hasProduct}
        >
          <BsCardChecklist size="30" color="#FFF" />
        </Checkout>
      </OverlayTrigger>
    </Wrapper>
  );
}

export default HomePage;
