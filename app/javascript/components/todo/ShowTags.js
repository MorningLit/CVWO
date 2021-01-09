import React, { Fragment } from "react";
import { BsCaretUp } from "react-icons/bs";
import ListGroup from "react-bootstrap/ListGroup";
import styled from "styled-components";

const ListContainer = styled.div`
  display: flex;
  overflow: auto;
`;
function ShowTags(props) {
  const tags = props.tagSet.map((tag) => {
    return (
      <ListGroup.Item
        key={tag}
        as="button"
        href={tag}
        onClick={() => props.handleTagClick(tag)}
      >
        {tag}
      </ListGroup.Item>
    );
  });

  return (
    <Fragment>
      <ListContainer data-simplebar>
        <ListGroup horizontal={true} defaultActiveKey="All">
          {tags}
        </ListGroup>
      </ListContainer>
      <BsCaretUp
        size="24px"
        cursor="pointer"
        onClick={() => props.handleShowTags()}
      />
    </Fragment>
  );
}

export default React.memo(ShowTags);
