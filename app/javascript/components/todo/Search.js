import React, { Fragment } from "react";
import Form from "react-bootstrap/Form";

function Search(props) {
  return (
    <Fragment>
      <Form.Control
        value={props.query}
        onChange={props.handleQuery}
        placeholder="Search..."
      />
    </Fragment>
  );
}

export default React.memo(Search);
