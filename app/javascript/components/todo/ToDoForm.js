import React, { PureComponent, Fragment } from "react";
import { BsArrowLeft, BsTrash } from "react-icons/bs";
import { CirclePicker } from "react-color";
import { colors } from "./ColorMap";
import StyledButton from "../style/StyledButton";
import Form from "react-bootstrap/Form";
import styled from "styled-components";

const ToDoFocus = styled(Form)`
  width: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 4px;
  margin: 2px;
`;

export class ToDoForm extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { mainToDo } = this.props;
    return (
      <Fragment>
        <BsArrowLeft
          onClick={() => this.props.viewList()}
          size="40px"
          cursor="pointer"
        />
        <ToDoFocus onSubmit={this.props.createTodo}>
          <Form.Group controlId="ToDoTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              required
              value={mainToDo.title}
              onChange={this.props.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="ToDoDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="description"
              value={mainToDo.description}
              onChange={this.props.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="ToDoColor">
            <Form.Label>Color</Form.Label>
            <CirclePicker
              onChange={this.props.handleChangeColor}
              value={mainToDo.color}
              colors={Array.from(colors.keys())}
              width="stretch"
            />
          </Form.Group>
          <StyledButton type="submit">Save</StyledButton>
        </ToDoFocus>

        {this.props.mode === "EDIT" ? (
          <BsTrash
            onClick={() => this.props.deleteTodo(mainToDo.id)}
            size="40px"
            cursor="pointer"
          ></BsTrash>
        ) : null}
      </Fragment>
    );
  }
}

export default ToDoForm;
