import React, { Fragment } from "react";
import { BsCaretDown } from "react-icons/bs";

function HideTags(props) {
  return (
    <Fragment>
      <BsCaretDown
        size="24px"
        cursor="pointer"
        onClick={() => props.handleShowTags()}
      />
    </Fragment>
  );
}
export default React.memo(HideTags);
