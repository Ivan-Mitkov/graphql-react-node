import React from "react";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
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
  const { data, loading, error } = useQuery(GET_ALL_POSTS);
  const [
    fetchPosts,
    { data: postsData, loading: loadingData, error: errorData },
  ] = useLazyQuery(GET_ALL_POSTS);

  if (loading) return <p className="p-5">Loading...</p>;
  if (error) return <p className="p-5">{error.message}</p>;

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
        <Button className="btn btn-raised btn-primary" onClick={fetchPosts}>
          Click
        </Button>
      </Row>
      <hr />
      {JSON.stringify(postsData)}
    </Container>
  );
};

export default AllPosts;
