import React, { Fragment } from "react";
import { BsArrowLeft, BsTrash } from "react-icons/bs";
import { CirclePicker } from "react-color";
import { colors } from "./ColorMap";
import StyledButton from "../style/StyledButton";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "../style/ToDoForm.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

  const renderBackTooltip = (props) => (
    <Tooltip id="back-tooltip" {...props}>
      Back
    </Tooltip>
  );
  const renderDeleteTooltip = (props) => (
    <Tooltip id="delete-tooltip" {...props}>
      Delete
    </Tooltip>
  );

  return (
    <Fragment>
      <OverlayTrigger
        placement="bottom"
        delay={{ show: 250, hide: 400 }}
        overlay={renderBackTooltip}
      >
        <BsArrowLeft
          onClick={() => props.viewList()}
          size="40px"
          cursor="pointer"
        />
      </OverlayTrigger>

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

        <Form.Group controlId="ToDoStart">
          <Form.Label>Start</Form.Label>
          <DatePicker
            selected={new Date(mainToDo.start)}
            onChange={props.handleChangeStart}
            dateFormat="Pp"
            showTimeSelect
            selectsStart
            startDate={mainToDo.start}
            endDate={mainToDo.end}
            required
          />
        </Form.Group>

        <Form.Group controlId="ToDoEnd">
          <Form.Label>End</Form.Label>
          <DatePicker
            selected={new Date(mainToDo.end)}
            onChange={props.handleChangeEnd}
            dateFormat="Pp"
            showTimeSelect
            selectsEnd
            startDate={mainToDo.start}
            endDate={mainToDo.end}
            minDate={mainToDo.start}
            required
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
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={renderDeleteTooltip}
        >
          <BsTrash
            onClick={() => props.deleteTodo(mainToDo.id)}
            size="40px"
            cursor="pointer"
          ></BsTrash>
        </OverlayTrigger>
      ) : null}
    </Fragment>
  );
}

export default React.memo(ToDoFocus);
