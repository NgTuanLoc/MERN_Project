import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  ListGroup,
  Row,
  Col,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";

import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const productQuantity = location.search ? location.search.split("=")[1] : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const removeCartItemHandler = (removeItemId) => {
    dispatch(removeFromCart(removeItemId));
  };
  const checkoutHandler = () => {
    history.push("/login/?redirect=shipping");
  };
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, productQuantity));
    }
  }, [dispatch, productQuantity, productId]);
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your Cart is empty!. <Link to="/">Go back</Link>
          </Message>
        ) : (
          <ListGroup>
            {cartItems.map((cartItem) => {
              return (
                <ListGroup.Item key={cartItem.product}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={cartItem.image}
                        alt={cartItem.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${cartItem.product}`}>
                        {cartItem.name}
                      </Link>
                    </Col>
                    <Col md={2}>{`$${cartItem.price}`}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={cartItem.quantity}
                        onChange={(event) => {
                          dispatch(
                            addToCart(
                              cartItem.product,
                              Number(event.target.value)
                            )
                          );
                        }}
                      >
                        {[...Array(cartItem.countInStock).keys()].map(
                          (item) => {
                            return (
                              <option key={item} value={item + 1}>
                                {item + 1}
                              </option>
                            );
                          }
                        )}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeCartItemHandler(cartItem.product)}
                      >
                        <i className="fas fa-trash" />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal (
                {Number(
                  cartItems.reduce(
                    (acc, cartItem) => acc + Number(cartItem.quantity),
                    0
                  )
                )}
                ) items
              </h2>
              $
              {cartItems
                .reduce(
                  (acc, cartItem) => acc + cartItem.quantity * cartItem.price,
                  0
                )
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
                style={{ width: "100%" }}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;