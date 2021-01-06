import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import { colors } from "./ColorMap";
import Search from "./Search";
import "../style/Scrollbar.css";
import { BsPlusSquare } from "react-icons/bs";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import EmptyToDo from "./EmptyToDo";
import ShowTags from "./ShowTags";
import HideTags from "./HideTags";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: stretch;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;
const SearchAddContainer = styled.div`
  display: flex;
`;

const SearchBar = styled.div`
  margin: 3px 3px 2px 3px;
  width: stretch;
`;

const PlusButton = styled(BsPlusSquare)`
  margin: 2px 3px 1px 0px;
`;

const ListContainer = styled.div`
  display: flex;
  overflow: auto;
`;

const List = styled(ListGroup)`
  width: stretch;
`;

function ToDoList(props) {
  const [query, setQuery] = useState("");
  const [showTags, setShowTags] = useState(false);

  const handleQuery = (input) => {
    const value = input.target.value;
    setQuery(value);
  };

  const handleShowTags = () => {
    setShowTags((prev) => !prev);
  };

  const list = props.currentTodos
    .filter(
      (todo) =>
        !query || todo.title.includes(query) || todo.description.includes(query)
    )
    .map((todo) => {
      // TODO update this
      todo.tags = [];
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

  const renderCreateTooltip = (props) => (
    <Tooltip id="back-tooltip" {...props}>
      Create
    </Tooltip>
  );

  return (
    <Container>
      <SearchAddContainer>
        <SearchBar>
          <Search handleQuery={handleQuery} query={query} />
        </SearchBar>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={renderCreateTooltip}
        >
          <PlusButton
            size="42px"
            cursor="pointer"
            onClick={() =>
              props.viewToDo({
                todo: EmptyToDo(),
                mode: "CREATE",
              })
            }
          ></PlusButton>
        </OverlayTrigger>
      </SearchAddContainer>

      {showTags ? (
        <ShowTags handleShowTags={handleShowTags} />
      ) : (
        <HideTags handleShowTags={handleShowTags} />
      )}

      <ListContainer data-simplebar>
        <List variant="flush">{list}</List>
      </ListContainer>
    </Container>
  );
}

export default React.memo(ToDoList);
