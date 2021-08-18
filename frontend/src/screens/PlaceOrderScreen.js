import { Fragment, useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";

import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod, cartItems } = cart;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, order, error } = orderCreate;

  const addDecimals = (number) => (Math.round(number * 100) / 100).toFixed(2);

  cart.itemsPrice = addDecimals(
    cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice >= 100 ? 0 : 10);
  cart.tax = addDecimals(Number(0.15 * cart.itemsPrice).toFixed(2));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.tax)
  ).toFixed(2);

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
  }, [history, success, order]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        tax: cart.tax,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <Fragment>
      <CheckoutSteps step1 step2 step3 step4 />
      {loading ? (
        <Loader />
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <strong>Address: </strong>
                  {shippingAddress.address}, {shippingAddress.city},{" "}
                  {shippingAddress.postalCode}, {shippingAddress.country}
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Payment Method</h2>
                <strong>Method: </strong>
                {paymentMethod}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Order Items</h2>
                {cartItems.length === 0 ? (
                  <Message>Your cart is empty !</Message>
                ) : (
                  <ListGroup variant="flush">
                    {cartItems.map((item, index) => {
                      return (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col>
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={4}>
                              {item.quantity}x{item.price}=$
                              {addDecimals(item.quantity * item.price)}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      );
                    })}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${cart.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${cart.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${cart.tax}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total Price</Col>
                    <Col>${cart.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-center">
                  <Button
                    type="button"
                    className="btn "
                    onClick={submitHandler}
                  >
                    Place Order
                  </Button>
                </ListGroup.Item>
                {error ? <Message variant="danger">{error}</Message> : null}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </Fragment>
  );
};

export default PlaceOrderScreen;
