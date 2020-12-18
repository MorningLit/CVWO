import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Container = styled.div`
  max-height: 100vh;
  width: stretch;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;

const List = styled(ListGroup)`
  display: block;
  overflow: scroll;
  overflow-x: hidden;
`;

const CreateToDoButton = styled(Button)`
  background-color: ${(props) => props.theme.splash};
  border-color: transparent;
  color: ${(props) => props.theme.secondaryColor};
`;

export default function toDoList(props) {
  const list = props.todos.map((item) => {
    item.mode = "EDIT";
    console.log(item.id);
    return (
      <ListGroup.Item
        action
        variant="light"
        key={item.id}
        onClick={() => props.viewToDo(item)}
      >
        <Form.Check
          inline
          type="checkbox"
          defaultChecked={item.completed}
          onClick={() => props.toggleCompleted(item)}
        />
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
