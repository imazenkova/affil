import React from "react";
import {
  useRouterContext,
  useRouterType,
  useLink,
  useRefineOptions,
} from "@refinedev/core";
import { Typography, theme, Space } from "antd";
import type { RefineLayoutThemedTitleProps } from "@refinedev/antd";

export const ThemedTitleV2: React.FC<RefineLayoutThemedTitleProps> = ({
  collapsed,
  icon: iconFromProps,
  text: textFromProps,
  wrapperStyles,
}) => {
  const { title: { icon: defaultIcon, text: defaultText } = {} } =
    useRefineOptions();
  const icon =
    typeof iconFromProps === "undefined" ? defaultIcon : iconFromProps;
  const text =
    typeof textFromProps === "undefined" ? defaultText : textFromProps;
  const { token } = theme.useToken();
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  return (
    <ActiveLink
      to="/"
      style={{
        display: "inline-block",
        textDecoration: "none",
      }}
    >
      <Space
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "inherit",
          ...wrapperStyles,
        }}
      >
        <div
          style={{
            height: "84px",
            width: "84px",
            color: token.colorPrimary,
          }}
        >
 <svg width="84px" height="84px">
            <image href="/Bruxt.png" width="84px" height="84px" />
        </svg>
        </div>

        {/* {!collapsed && (
          <Typography.Title
            style={{
              fontSize: "inherit",
              marginBottom: 0,
              fontWeight: 700,
            }}
          >
           Bruxt
          </Typography.Title>
        )} */}
      </Space>
    </ActiveLink>
  );
};
