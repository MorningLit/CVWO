import React, { PureComponent } from "react";
import ToDoList from "./ToDoList";
import styled from "styled-components";
import StyledNavBar from "../style/StyledNavBar";
import axios from "axios";
import update from "immutability-helper";
import Spinner from "react-bootstrap/Spinner";
import ToDoFocus from "./ToDoFocus";
import { toast } from "react-toastify";
import { parseISO } from "date-fns";

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
        color: "#cccccc",
        completed: false,
        id: "",
        start: "",
        end: "",
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
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
  }

  componentDidMount() {
    // check login status
    this._isMounted = true;
    axios
      .get("/api/v1/todos.json")
      .then((response) => {
        let filtered = response.data
          .filter((item) => item.user_id === this.props.user.id)
          .map((item) => {
            item.start = parseISO(item.start);
            item.end = parseISO(item.end);
            return item;
          });
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
    const { mainToDo, mode, currentTodos } = this.state;
    if (mode === "CREATE") {
      axios
        .post(
          "/api/v1/todos",
          {
            user: {
              email: this.props.user.email,
            },
            todo: {
              title: mainToDo.title,
              description: mainToDo.description,
              color: mainToDo.color,
              completed: false,
              start: mainToDo.start,
              end: mainToDo.end,
            },
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          const todos = update(currentTodos, {
            $splice: [[0, 0, response.data]],
          });
          this.setState({ currentTodos: todos });
          toast.info("Task created! 💪");
        })
        .catch((error) => {
          toast.error(`Oops! Something went wrong! 😵\n${error}`);
        });
    } else if (mode === "EDIT") {
      axios
        .put(`/api/v1/todos/${mainToDo.id}`, {
          todo: {
            title: mainToDo.title,
            description: mainToDo.description,
            color: mainToDo.color,
            start: mainToDo.start,
            end: mainToDo.end,
          },
        })
        .then((response) => {
          const todoIndex = currentTodos.findIndex(
            (x) => x.id === response.data.id
          );
          const todos = update(currentTodos, {
            [todoIndex]: { $set: mainToDo },
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
        color: "#cccccc",
        completed: false,
        id: "",
        start: "",
        end: "",
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
  handleChangeStart(start) {
    this.setState((prevState) => ({
      ...prevState,
      mainToDo: {
        ...prevState.mainToDo,
        start: start,
      },
    }));
  }
  handleChangeEnd(end) {
    this.setState((prevState) => ({
      ...prevState,
      mainToDo: {
        ...prevState.mainToDo,
        end: end,
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
              handleChangeStart={this.handleChangeStart}
              handleChangeEnd={this.handleChangeEnd}
            />
          </ToDoViewerSection>
        ) : null}
      </BackgroundDiv>
    );
  }
}

export default ToDoPage;
