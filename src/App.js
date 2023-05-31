import logo from "./logo.svg";
import "./App.css";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [valueSearch, setValueSearch] = useState("");

  // console.log(11, users);
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://api.github.com/search/users?q=${valueSearch}`, {
      method: "GET",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      // body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then((data) =>
        data.items ? setUsers(data.items) : setUsers([])
      )
      .catch((err) => console.log(err));
  };
  return (
    <Container>
      <header>
        <div>
          <h3>Github Finder</h3>
        </div>
        <div id="right-header">
          <h4>Home</h4>
          <h4>About</h4>
        </div>
      </header>

      <form action="" onSubmit={handleSubmit}>
        <div id="form-search">
          <input
            type="search"
            placeholder="Search Users..."
            id="id-search"
            onChange={(e) => setValueSearch(e.target.value)}
          />
          <input type="submit" value="Search" id="id-submit" />
        </div>
      </form>
      <hr />
      <Container>
        {users.length > 0 && (
          <Row>
            {users?.map((user, index) => {
              return (
                <Col lg="3" md="6" key={index} id="view-product">
                  <Card style={{ width: "18rem" }}>
                    <Card.Img variant="top" src={user.avatar_url} />
                    <Card.Body>
                      <Card.Title>{user.login}</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card
                        title and make up the bulk of the card's
                        content.
                      </Card.Text>
                      <Button variant="primary">Detail</Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}
      </Container>
    </Container>
  );
}

export default App;
