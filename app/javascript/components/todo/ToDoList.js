import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Container = styled(Card)`
  max-height: 100vh;
  background-color: pink;
  width: 30vw;
`;

const List = styled(ListGroup)`
  display: block;
  overflow: scroll;
  overflow-x: hidden;
`;

const CreateToDoButton = styled(Button)`
  background-color: grey;
`;

export default function toDoList(props) {
  const list = props.todos.map((item) => {
    item.mode = "EDIT";
    return (
      <ListGroup.Item
        action
        variant="light"
        key={item.id}
        onClick={() => props.viewToDo(item)}
      >
        <Form.Check inline type="checkbox" defaultChecked={item.completed} />
        {item.title}
      </ListGroup.Item>
    );
  });

  return (
    <Container>
      <CreateToDoButton
        onClick={() =>
          props.viewToDo({
            title: "",
            description: "",
            color: "",
            completed: false,
            id: "",
            mode: "CREATE",
          })
        }
      >
        New ToDo
      </CreateToDoButton>
      <List variant="flush">{list}</List>
    </Container>
  );
}
