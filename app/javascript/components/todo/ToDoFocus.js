import React, { Fragment } from "react";
import { BsArrowLeft, BsTrash } from "react-icons/bs";
import { CirclePicker } from "react-color";
import { colors } from "./ColorMap";
import StyledButton from "../style/StyledButton";
import Form from "react-bootstrap/Form";
import styled from "styled-components";

const ToDoForm = styled(Form)`
  width: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 4px;
  margin: 2px;
`;

function ToDoFocus(props) {
  const { mainToDo } = props;

  return (
    <Fragment>
      <BsArrowLeft
        onClick={() => props.viewList()}
        size="40px"
        cursor="pointer"
      />
      <ToDoForm onSubmit={props.createTodo}>
        <Form.Group controlId="ToDoTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            required
            value={mainToDo.title}
            onChange={props.handleChange}
          />
        </Form.Group>

        <Form.Group controlId="ToDoDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="description"
            value={mainToDo.description}
            onChange={props.handleChange}
          />
        </Form.Group>

        <Form.Group controlId="ToDoColor">
          <Form.Label>Color</Form.Label>
          <CirclePicker
            onChange={props.handleChangeColor}
            value={mainToDo.color}
            colors={Array.from(colors.keys())}
            width="stretch"
          />
        </Form.Group>
        <StyledButton type="submit">Save</StyledButton>
      </ToDoForm>

      {props.mode === "EDIT" ? (
        <BsTrash
          onClick={() => props.deleteTodo(mainToDo.id)}
          size="40px"
          cursor="pointer"
        ></BsTrash>
      ) : null}
    </Fragment>
  );
}

export default React.memo(ToDoFocus);
