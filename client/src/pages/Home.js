import React, { useContext } from "react";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { AuthContext } from "../context/authContext";
import { LOGGED_IN_USER } from "../constants";

const GET_ALL_POSTS = gql`
  query {
    allPosts {
      id
      title
      description
    }
  }
`;
const AllPosts = () => {
  const { state, dispatch } = useContext(AuthContext);

  const { data, loading, error } = useQuery(GET_ALL_POSTS);
  const [toggle, setToggle] = React.useState(false);
  
  //check context
  console.log(state.user);
  React.useEffect(() => {
    dispatch({ type: LOGGED_IN_USER, payload: "Ivan" });
  }, [dispatch]);

  //useLazyQuery if we want to get data as response of some event
  //execute fetchPosts to trigger this hook
  //there are naming conflict between useQuery and useLazyQuery so we are renaming data,loading and error
  const [
    fetchPosts,
    { data: postsData, loading: loadingData, error: errorData },
  ] = useLazyQuery(GET_ALL_POSTS);

  if (loading) return <p className="p-5">Loading...</p>;
  if (error) return <p className="p-5">{error.message}</p>;

  const toggleData = () => {
    setToggle(!toggle);
  };

  const handleClick = () => {
    toggleData();
    fetchPosts();
  };

  return (
    <Container fluid className="align-items-center w-75 p-5">
      <Row>
        {data.allPosts.map((post) => (
          <Col key={post.id}>
            <Card className="my-3 p-3 rounded" style={{ minWidth: "25rem" }}>
              <Card.Body>
                <Card.Title>
                  <h4>{post.title}</h4>
                </Card.Title>
                <Card.Text>{post.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row>
        <Button className="btn btn-raised btn-primary" onClick={handleClick}>
          Click
        </Button>
      </Row>
      <hr />
      {!loadingData && !errorData && toggle && JSON.stringify(postsData)}
    </Container>
  );
};

export default AllPosts;
