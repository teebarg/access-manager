/** @jsx jsx */
import { jsx } from "@emotion/react";

import { Link } from "@reach/router";
import * as mq from "../styles/media-queries";
import * as colors from "../styles/colors";
import { useListItemDispatch, removeListItem } from "../context/access-context";
import { FaMinusCircle, FaTimesCircle } from "react-icons/fa";
import Tooltip from "@reach/tooltip";
import { CircleButton, Spinner } from "./lib";
import useCallbackStatus from "../utils/use-callback-status";

function TooltipButton({ label, highlight, onClick, icon, ...rest }) {
  const { isPending, isRejected, error, run } = useCallbackStatus();

  function handleClick() {
    run(onClick());
  }

  return (
    <Tooltip label={isRejected ? error.message : label}>
      <CircleButton
        css={{
          ":hover,:focus": { color: isPending ? colors.gray80 : highlight },
        }}
        disabled={isPending}
        onClick={handleClick}
        {...rest}
      >
        {isPending ? <Spinner /> : isRejected ? <FaTimesCircle /> : icon}
      </CircleButton>
    </Tooltip>
  );
}

function AccessRow({ access }) {
  const { username, password, title, partner } = access;
  const dispatch = useListItemDispatch();

  function handleRemoveClick() {
    return removeListItem(dispatch, access.id);
  }

  return (
    <div
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        position: "relative",
      }}
    >
      <Link
        to={`/book`}
        css={{
          flexGrow: 2,
          display: "grid",
          gridTemplateColumns: "140px 1fr",
          gridGap: 20,
          border: `1px solid ${colors.gray20}`,
          color: colors.text,
          padding: "1.25em",
          borderRadius: "3px",
          ":hover,:focus": {
            textDecoration: "none",
            boxShadow: "0 5px 15px -5px rgba(0,0,0,.08)",
            color: "inherit",
          },
        }}
      >
        <div
          css={{
            width: 140,
            [mq.small]: {
              width: 100,
            },
          }}
        >
          {partner}
        </div>
        <div css={{ flex: 1 }}>
          <div css={{ display: "block" }}>
            <h2
              css={{
                fontSize: "1.25em",
                margin: "0",
                color: colors.indigo,
              }}
            >
              {title}
            </h2>
            <p>
              <span css={{ fontWeight: "bold" }}>Username: </span>
              {username}
            </p>
            <p>
              <span css={{ fontWeight: "bold" }}>Password: </span>
              {password}
            </p>
          </div>
        </div>
      </Link>
      <div
        css={{
          marginLeft: "20px",
          position: "absolute",
          color: colors.gray80,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          height: "100%",
        }}
      >
        <TooltipButton
          label="Remove from list"
          highlight={colors.danger}
          onClick={handleRemoveClick}
          icon={<FaMinusCircle />}
        />
      </div>
    </div>
  );
}

export default AccessRow;
