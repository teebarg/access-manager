/** @jsx jsx */
import { jsx } from "@emotion/react";

import React, { useState } from "react";
import { useAuth } from "../context/auth-context";
import {
  Button,
  Spinner,
  FormGroup,
  FormInput,
  Label,
} from "../components/lib";
import { FaMinusCircle, FaTimesCircle } from "react-icons/fa";
import useCallbackStatus from "../utils/use-callback-status";
// import { useNavigate } from "@reach/router";
import * as colors from "../styles/colors";

import { Link } from "@reach/router";

function AddButton({ label, highlight, onClick, disabled, icon, ...rest }) {
  const { isPending, isRejected, run } = useCallbackStatus();
  // const navigate = useNavigate();

  async function handleClick() {
    await run(onClick());
  }

  return (
    <Button
      css={{
        ":hover,:focus": { color: isPending ? colors.gray80 : highlight },
        marginTop: 10,
        width: '100%'
      }}
      disabled={disabled || isPending}
      onClick={handleClick}
      {...rest}
    >
      {isPending ? <Spinner /> : isRejected ? <FaTimesCircle /> : icon} Login
    </Button>
  );
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  function handleAddClick() {
    return login({ email, password });
  }

  function isDisabled() {
    return !Boolean(email) || !Boolean(password);
  }

  return (
    <div
      css={{
        padding: 30,
      }}
      className="elevate"
    >
      <div>
        <h3
          css={{
            textAlign: "center",
          }}
        >
          Login Here
        </h3>
        <form>
          <FormGroup>
            <Label>Email</Label>
            <FormInput
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <AddButton
            onClick={handleAddClick}
            disabled={isDisabled()}
            icon={<FaMinusCircle />}
          />
        </form>
      </div>
    </div>
  );
}

export default Login;
