import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./App.scss";

import axios from "axios";
import {
  Carousel,
  Col,
  Container,
  Form,
  Nav,
  NavDropdown,
  Navbar,
  Pagination,
  Row,
  Spinner,
} from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";
function App() {
  const [productList, setProductList] = useState([
    {
      id: "",
      name: "",
      price: "",
      url: "",
    },
  ]);
  const [page, setPage] = useState(1);
  const [productLoading, setProductLoading] = useState(false);

  const fetchProduct = async () => {
    const getProductApi = () =>
      axios.get("http://localhost:8080/api/v1/products", {});
    try {
      setProductLoading(true);
      const rs = await getProductApi();
      setProductList(rs.data);
    } catch (error) {
      console.log(error);
    } finally {
      setProductLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg" fixed="top">
        <Container fluid>
          <Navbar.Brand href="#">Clothes shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Link</Nav.Link>
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#" disabled>
                Link
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={productList[0]?.url}
            alt="First slide"
            style={{ height: "200px" }}
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={productList[1]?.url}
            style={{ height: "200px" }}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={productList[2]?.url}
            style={{ height: "200px" }}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel> */}

      {productLoading ? (
        <Spinner animation="border" />
      ) : (
        <Row xs={1} md={4} className="mt-5">
          {productList.map((product) => {
            return (
              <Col className="d-flex mb-4">
                <Card>
                  <Card.Img
                    variant="top"
                    src={
                      product.url ||
                      "https://learnenglishkids.britishcouncil.org/sites/kids/files/styles/430x261_4/public/2022-09/RS1415_Jumper_col-hig.jpeg?itok=DfHD1jmI"
                    }
                  />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Title>{product.price}</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}

      <Row>
        <PaginationControl
          page={page}
          between={4}
          total={250}
          limit={20}
          changePage={(page) => {
            setPage(page);
            console.log(page);
          }}
          ellipsis={1}
        />
      </Row>
    </div>
  );
}

export default App;
