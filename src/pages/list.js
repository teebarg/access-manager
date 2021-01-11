import React from "react";
import { useListItemState } from "../context/access-context";
import { AccessListUL } from "../components/lib";
import AccessRow from "../components/access-row";

export default function List() {
  const listItems = useListItemState();
  return (
    <div css={{ marginTop: "1em" }}>
      {!listItems.length ? (<h4>No List available or Check your Internet</h4>) : (<h3 style={{textAlign: "center"}}>My Access List</h3>)}
      <AccessListUL>
        {listItems.map((listItem, key) => (
            <AccessRow access={listItem} key={key} />
        ))}
      </AccessListUL>
    </div>
  );
}
