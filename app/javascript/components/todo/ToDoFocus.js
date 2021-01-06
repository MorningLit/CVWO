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
import ReactTags from "react-tag-autocomplete";
import { toast } from "react-toastify";

const ToDoForm = styled(Form)`
  width: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 4px;
  margin: 2px;
`;

const DateDiv = styled.div`
  width: 50%;
  display: block;
`;

const DateWrapper = styled.div`
  display: flex;
  flex-direction: row;
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

  const onValidate = (tag) => {
    if (tag.name.length > 10) {
      toast.error(`Tag rejected! 🚫\nKeep your tags to a max length of 10!`);
    }
    return tag.name.length <= 10;
  };

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
            rows={2}
            name="description"
            value={mainToDo.description}
            onChange={props.handleChange}
          />
        </Form.Group>

        <DateWrapper>
          <DateDiv>
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
          </DateDiv>
          <DateDiv>
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
          </DateDiv>
        </DateWrapper>

        <Form.Group controlId="ToDoColor">
          <Form.Label>Color</Form.Label>
          <CirclePicker
            onChange={props.handleChangeColor}
            value={mainToDo.color}
            colors={Array.from(colors.keys())}
            width="stretch"
          />
        </Form.Group>

        <Form.Group controlId="ToDoTags">
          <Form.Label>Tags</Form.Label>
          <ReactTags
            tags={props.mainToDo.tags}
            allowNew={true}
            onDelete={props.onDelete}
            onAddition={props.onAddition}
            onValidate={onValidate}
            // wait for this library to update to add max tags
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
