import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { colors } from "./ColorMap";

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
  const list = props.todos.map((todo) => {
    let item = { todo: todo, mode: "EDIT" };
    return (
      <ListGroup.Item
        action
        variant={colors.get(item.todo.color)}
        key={item.todo.id}
        onClick={() => props.viewToDo(item)}
      >
        <Form.Check
          inline
          type="checkbox"
          defaultChecked={item.todo.completed}
          onClick={() => props.toggleCompleted(item)}
        />
        {item.todo.title}
      </ListGroup.Item>
    );
  });

  return (
    <Container>
      <CreateToDoButton
        onClick={() =>
          props.viewToDo({
            todo: {
              title: "",
              description: "",
              color: "#fdfdfe",
              completed: false,
              id: "",
            },

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
