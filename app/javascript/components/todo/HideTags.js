import React from "react";
import { BsCaretDown } from "react-icons/bs";

function HideTags(props) {
  return (
    <div>
      <BsCaretDown
        size="24px"
        cursor="pointer"
        onClick={() => props.handleShowTags()}
      />
    </div>
  );
}
export default React.memo(HideTags);
