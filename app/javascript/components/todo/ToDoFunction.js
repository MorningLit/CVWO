import EmptyToDo from "./EmptyToDo";
import { toast } from "react-toastify";

const viewList = () => ({
  mainToDo: EmptyToDo(),
  mode: "VIEW",
});

const viewToDo = (data) => ({
  mainToDo: data.todo,
  mode: data.mode,
});

const checkLoginStatus = (loggedInStatus) => {
  if (loggedInStatus === "LOGGED_IN") {
    return true;
  } else {
    toast.error(`Oops! Something went wrong! 😵`);
    return false;
  }
};

export { viewList, viewToDo, checkLoginStatus };
