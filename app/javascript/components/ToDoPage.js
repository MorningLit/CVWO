import React, { Component } from "react";
import ToDoList from "./todo/ToDoList";
import styled from "styled-components";
import NavBar from "./NavBar";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import update from "immutability-helper";

const BackgroundDiv = styled.div`
  display: flex;
  margin: 0;
`;

const ToDoListSection = styled.div`
  width: 45vw;
  height: 100vh;
  background-color: cornflowerblue;
  display: flex;
  justify-content: center;
  padding: 16px 0;
`;

const ToDoViewerSection = styled.div`
  width: 45vw;
  height: 100vh;
  background-color: burlywood;
  display: flex;
  justify-content: center;
  padding: 16px 0;
`;

const DeleteButton = styled(Button)`
  background-color: red;
  height: 32px;
`;

const BackButton = styled(Button)`
  background-color: grey;
  height: 30px;
`;

const SaveButton = styled(Button)`
  background-color: green;
  height: 30px;
`;

export class ToDoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTodos: [],
      mainToDo: {
        title: "",
        description: "",
        color: "",
        completed: false,
        id: "",
      },

      mode: "VIEW",
    };
    this.viewToDo = this.viewToDo.bind(this);
    this.viewList = this.viewList.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.readUserData = this.readUserData.bind(this);
    this.createTodo = this.createTodo.bind(this);
  }
  componentDidMount() {
    this.readUserData();
  }
  readUserData() {
    axios
      .get("http://localhost:3000/api/v1/todos.json")
      .then((response) => {
        let filtered = response.data.filter(
          (item) => item.user_id === this.props.user.id
        );
        this.setState({ currentTodos: filtered });
      })
      .catch((error) => console.log(error));
  }

  createTodo(event) {
    // check login status
    if (this.state.mode === "CREATE") {
      axios
        .post(
          "http://localhost:3000/api/v1/todos",
          {
            user: {
              email: this.props.user.email,
            },
            todo: {
              title: this.state.mainToDo.title,
              description: this.state.mainToDo.description,
              color: this.state.mainToDo.color,
              completed: false,
            },
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log(response);
          const todos = update(this.state.currentTodos, {
            $splice: [[0, 0, response.data]],
          });
          this.setState({ currentTodos: todos });
          this.viewList();
        })
        .catch((error) => {
          console.log("create todo error", error);
        });
    } else if (this.state.mode === "EDIT") {
      const todo = {
        title: this.state.mainToDo.title,
        description: this.state.mainToDo.description,
        color: this.state.mainToDo.color,
      };

      axios
        .put(`http://localhost:3000/api/v1/todos/${this.state.mainToDo.id}`, {
          todo: todo,
        })
        .then((response) => {
          const todoIndex = this.state.currentTodos.findIndex(
            (x) => x.id === response.data.id
          );
          const todos = update(this.state.currentTodos, {
            [todoIndex]: { $set: todo },
          });
          this.setState({ currentTodos: todos });
        })
        .catch((error) => console.log(error));
    }
    event.preventDefault();
  }

  deleteTodo = (id) => {
    // check login status
    axios
      .delete(`http://localhost:3000/api/v1/todos/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        const todoIndex = this.state.currentTodos.findIndex((x) => x.id === id);
        const todos = update(this.state.currentTodos, {
          $splice: [[todoIndex, 1]],
        });
        this.setState({ currentTodos: todos });
      })
      .catch((error) => {
        console.log("todo error", error);
      });
  };

  viewToDo(data) {
    this.setState({
      mainToDo: {
        title: data.title,
        description: data.description,
        color: data.color,
        completed: data.completed,
        id: data.id,
      },
      mode: data.mode,
    });
  }

  viewList() {
    this.setState({
      mainToDo: {
        title: "",
        description: "",
        color: "",
        completed: false,
        id: "",
      },
      mode: "VIEW",
    });
  }

  handleChange(event) {
    this.setState((prevState) => ({
      ...prevState,
      mainToDo: {
        ...prevState.mainToDo,
        [event.target.name]: event.target.value,
      },
    }));
  }

  render() {
    return (
      <BackgroundDiv>
        <NavBar />

        <ToDoListSection>
          <ToDoList
            user={this.props.user}
            todos={this.state.currentTodos}
            viewToDo={this.viewToDo}
          />
        </ToDoListSection>

        {this.state.mode === "CREATE" || this.state.mode === "EDIT" ? (
          <ToDoViewerSection>
            <BackButton onClick={() => this.viewList()}>back</BackButton>

            <Form onSubmit={this.createTodo} onBlur={this.handleBlur}>
              <Form.Group controlId="ToDoTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  name="title"
                  required
                  value={this.state.mainToDo.title}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="ToDoDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={this.state.mainToDo.description}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="ToDoColor">
                <Form.Label>Color</Form.Label>
                <Form.Control
                  name="color"
                  value={this.state.mainToDo.color}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <SaveButton type="submit">Save</SaveButton>
            </Form>

            {this.state.mode === "EDIT" ? (
              <DeleteButton
                onClick={() => this.deleteTodo(this.state.mainToDo.id)}
              >
                Delete
              </DeleteButton>
            ) : null}
          </ToDoViewerSection>
        ) : null}
      </BackgroundDiv>
    );
  }
}

export default ToDoPage;
