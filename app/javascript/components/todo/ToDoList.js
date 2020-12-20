import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import { colors } from "./ColorMap";
import StyledButton from "../style/StyledButton";
import Search from "./Search";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: stretch;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;
const SearchContainer = styled.div`
  display: flex;
`;

const List = styled(ListGroup)`
  overflow-x: hidden;
`;

function ToDoList(props) {
  const [query, setQuery] = useState("");

  const handleQuery = (input) => {
    const value = input.target.value;
    setQuery(value);
  };

  const list = props.currentTodos
    .filter(
      (todo) =>
        !query || todo.title.includes(query) || todo.description.includes(query)
    )
    .map((todo) => {
      const item = { todo: todo, mode: "EDIT" };
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
      <SearchContainer>
        <Search handleQuery={handleQuery} query={query} />
        <StyledButton
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
        </StyledButton>
      </SearchContainer>

      <List variant="flush">{list}</List>
    </Container>
  );
}

export default React.memo(ToDoList);
