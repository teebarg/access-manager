import React, { useState } from "react";
import {
  useListItemDispatch,
  useSingleListItemState,
  addListItem,
} from "../context/access-context";
import * as colors from "../styles/colors";
import {
  Button,
  Spinner,
  FormGroup,
  FormInput,
  FormSelect,
  Label,
} from "../components/lib";
import { FaMinusCircle, FaTimesCircle } from "react-icons/fa";
import useCallbackStatus from "../utils/use-callback-status";
import { useNavigate } from "@reach/router";

function AddButton({ label, highlight, onClick, disabled, icon, ...rest }) {
  const { isPending, isRejected, run } = useCallbackStatus();
  const navigate = useNavigate();

  async function handleClick() {
    await run(onClick());
    navigate(`/list`);
  }

  return (
    <Button
      css={{
        ":hover,:focus": { color: isPending ? colors.gray80 : highlight },
      }}
      disabled={disabled || isPending}
      onClick={handleClick}
      {...rest}
    >
      {isPending ? <Spinner /> : isRejected ? <FaTimesCircle /> : icon} Add
    </Button>
  );
}

export default function Create() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [partner, setPartner] = useState("self");
  const dispatch = useListItemDispatch();

  function handleAddClick(e) {
    return addListItem(dispatch, { username, password, title, partner });
  }

  function isDisabled() {
    return !Boolean(username) || !Boolean(password) || !Boolean(title) || !Boolean(partner);
  }

  return (
    <div>
      <h3>Add new Access</h3>
      <form>
        <FormGroup>
          <Label>Title</Label>
          <FormInput
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>User Identification</Label>
          <FormInput
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <FormInput
            type="text"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Partner</Label>
          <FormSelect
            name="partner"
            value={partner}
            onChange={(e) => setPartner(e.target.value)}
          >
            <option value="">Choose an Option</option>
            <option value="self">Self</option>
            <option value="altara">Altara</option>
            <option value="smng">SmNG</option>
          </FormSelect>
        </FormGroup>
        <AddButton
          onClick={handleAddClick}
          disabled={isDisabled()}
          icon={<FaMinusCircle />}
        />
      </form>
    </div>
  );
}
