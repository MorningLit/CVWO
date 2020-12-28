import EmptyToDo from "./EmptyToDo";

const viewList = () => ({
  mainToDo: EmptyToDo(),
  mode: "VIEW",
});

const viewToDo = (data) => ({
  mainToDo: data.todo,
  mode: data.mode,
});

export { viewList, viewToDo };
