import React from "react";

import { useGetIdentity } from "@refinedev/core";

import { SettingOutlined } from "@ant-design/icons";
import { Button, Popover } from "antd";


import { CustomAvatar } from "../../custom-avatar";
import { Text } from "../../text";
import { UpdateReferrer } from "../../../types/traffic";
import { AccountSettings } from "../account-settings";


export const CurrentUser = () => {
  const [opened, setOpened] = React.useState(false);
   const { data: user } = useGetIdentity<UpdateReferrer>();

   const content = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Text
        strong
        style={{
          padding: "12px 20px",
        }}
      >
      {user?.firstName} {" "} {user?.lastName}
      </Text>
      <div
        style={{
          borderTop: "1px solid #d9d9d9",
          padding: "4px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <Button
          style={{ textAlign: "left" }}
          icon={<SettingOutlined />}
          type="text"
          block
          onClick={() => setOpened(true)}
        > 
          Account settings
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Popover
        placement="bottomRight"
        content={content}
        trigger="click"
        overlayInnerStyle={{ padding: 0 }}
        overlayStyle={{ zIndex: 999 }}
      >
        <CustomAvatar
          name={user?.firstName}
          src='/avatarka.png'
          size="default"
          style={{ cursor: "pointer" }}
        />
      </Popover>
      {user && (
        <AccountSettings
          opened={opened}
          setOpened={setOpened}
          userId={user.id}
        />
      )}
    </>
  );
};
