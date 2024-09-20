import type { IResourceItem } from "@refinedev/core";

import {
  DashboardOutlined,
  ProjectOutlined,
  ShopOutlined,
} from "@ant-design/icons";

export const resources: IResourceItem[] = [
  {
    name: "dashboard",
    list: "/",
    meta: {
      label: "Dashboard",
      icon: <DashboardOutlined />,
    },
  },
  {
    name: "traffic",
    list: "/traffic",
    show: "/traffic/:id",
    create: "/traffic/new",
    edit: "/traffic/edit/:id",
    meta: {
      label: "Traffic",
      icon: <ShopOutlined />,
    },
  },
  // {
  //   name: "tasks",
  //   list: "/tasks",
  //   create: "/tasks/new",
  //   edit: "/tasks/edit/:id",
  //   meta: {
  //     label: "Tasks",
  //     icon: <ProjectOutlined />,
  //   },
  // },
];
