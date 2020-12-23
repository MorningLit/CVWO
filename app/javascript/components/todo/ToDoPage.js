import React, { PureComponent } from "react";
import ToDoList from "./ToDoList";
import styled from "styled-components";
import StyledNavBar from "../style/StyledNavBar";
import axios from "axios";
import update from "immutability-helper";
import Spinner from "react-bootstrap/Spinner";
import ToDoFocus from "./ToDoFocus";
import { ToastContainer, toast } from "react-toastify";

const BackgroundDiv = styled.div`
  display: flex;
  margin: 0;
`;

const ToDoListSection = styled.div`
  flex-basis: 45%;
  height: 100vh;
  background-color: transparent;
  display: flex;
  justify-content: center;
  padding: 16px 8px;
`;

const ToDoViewerSection = styled.div`
  flex-basis: 45%;
  height: 100vh;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  padding: 16px 8px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;

export class ToDoPage extends PureComponent {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      currentTodos: [],
      mainToDo: {
        title: "",
        description: "",
        color: "#fdfdfe",
        completed: false,
        id: "",
      },
      loading: true,
      mode: "VIEW",
    };
    this.viewToDo = this.viewToDo.bind(this);
    this.viewList = this.viewList.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.createTodo = this.createTodo.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
  }

  componentDidMount() {
    // check login status
    this._isMounted = true;
    axios
      .get("/api/v1/todos.json")
      .then((response) => {
        let filtered = response.data.filter(
          (item) => item.user_id === this.props.user.id
        );
        if (this._isMounted) {
          this.setState({ loading: false, currentTodos: filtered });
        }
      })
      .catch((error) =>
        toast.error(`Oops! Something went wrong! 😵\n${error}`)
      );
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  createTodo(event) {
    // check login status
    if (this.state.mode === "CREATE") {
      axios
        .post(
          "/api/v1/todos",
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
          const todos = update(this.state.currentTodos, {
            $splice: [[0, 0, response.data]],
          });
          this.setState({ currentTodos: todos });
          toast.info("Task created! 💪");
        })
        .catch((error) => {
          toast.error(`Oops! Something went wrong! 😵\n${error}`);
        });
    } else if (this.state.mode === "EDIT") {
      const todo = this.state.mainToDo;

      axios
        .put(`/api/v1/todos/${this.state.mainToDo.id}`, {
          todo: {
            title: todo.title,
            description: todo.description,
            color: todo.color,
          },
        })
        .then((response) => {
          const todoIndex = this.state.currentTodos.findIndex(
            (x) => x.id === response.data.id
          );
          const todos = update(this.state.currentTodos, {
            [todoIndex]: { $set: todo },
          });
          this.setState({ currentTodos: todos });
          toast.info("Task updated! 📝");
        })
        .catch((error) =>
          toast.error(`Oops! Something went wrong! 😵\n${error}`)
        );
    }
    this.viewList(); // for mobile to go back to focus
    event.preventDefault();
  }

  deleteTodo = (id) => {
    // check login status
    axios
      .delete(`/api/v1/todos/${id}`, {
        withCredentials: true,
      })
      .then(() => {
        const todoIndex = this.state.currentTodos.findIndex((x) => x.id === id);
        const todos = update(this.state.currentTodos, {
          $splice: [[todoIndex, 1]],
        });
        this.setState({ currentTodos: todos });
        toast.info("Task deleted! 🚮");
        this.viewList(); // for mobile to go back to focus
      })
      .catch((error) => {
        toast.error(`Oops! Something went wrong! 😵\n${error}`);
      });
  };

  viewList() {
    this.setState({
      mainToDo: {
        title: "",
        description: "",
        color: "#fdfdfe",
        completed: false,
        id: "",
      },
      mode: "VIEW",
    });
  }

  viewToDo(data) {
    this.setState({
      mainToDo: data.todo,
      mode: data.mode,
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
  handleChangeColor(color) {
    this.setState((prevState) => ({
      ...prevState,
      mainToDo: {
        ...prevState.mainToDo,
        color: color.hex,
      },
    }));
  }

  toggleCompleted(data) {
    const todo = data.todo;
    todo.completed = !todo.completed;
    axios
      .put(`/api/v1/todos/${todo.id}`, {
        todo: { completed: todo.completed },
      })
      .then((response) => {
        const todoIndex = this.state.currentTodos.findIndex(
          (x) => x.id === response.data.id
        );
        const todos = update(this.state.currentTodos, {
          [todoIndex]: { $set: todo },
        });
        this.setState({ currentTodos: todos });
        if (todo.completed) {
          toast.success("Task completed! 👍");
        } else {
          toast.warning("Task re-marked as undone. ☹️");
        }
      })
      .catch((error) =>
        toast.error(`Oops! Something went wrong! 😵\n${error}`)
      );
  }

  render() {
    const { currentTodos, mainToDo, loading, mode } = this.state;

    return (
      <BackgroundDiv>
        <StyledNavBar />

        <ToDoListSection>
          {loading ? (
            <Spinner animation="border" />
          ) : (
            <ToDoList
              user={this.props.user}
              currentTodos={currentTodos}
              viewToDo={this.viewToDo}
              toggleCompleted={this.toggleCompleted}
            />
          )}
        </ToDoListSection>

        {mode === "CREATE" || mode === "EDIT" ? (
          <ToDoViewerSection>
            <ToDoFocus
              mainToDo={mainToDo}
              mode={mode}
              handleChange={this.handleChange}
              handleChangeColor={this.handleChangeColor}
              viewList={this.viewList}
              deleteTodo={this.deleteTodo}
              createTodo={this.createTodo}
            />
          </ToDoViewerSection>
        ) : null}
        <ToastContainer position="bottom-center" />
      </BackgroundDiv>
    );
  }
}

export default ToDoPage;
