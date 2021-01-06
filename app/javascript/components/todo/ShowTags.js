import React from "react";
import { BsCaretUp } from "react-icons/bs";

function ShowTags(props) {
  return (
    <div>
      <BsCaretUp
        size="24px"
        cursor="pointer"
        onClick={() => props.handleShowTags()}
      />
    </div>
  );
}

export default React.memo(ShowTags);
