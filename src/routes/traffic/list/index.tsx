import React, { useEffect, useState } from "react";

import {
  FilterDropdown,
  useTable
} from "@refinedev/antd";
import { getDefaultFilter, type HttpError, useGo } from "@refinedev/core";

import { SearchOutlined } from "@ant-design/icons";
import { Input, Table } from "antd";
import { PaginationTotal, Text } from "../../../components";
import { ReferrerTrafficRecord } from "../../../types/traffic";


export const TrafficListPage = ({ children }: React.PropsWithChildren) => {
  const go = useGo();
  const [referrerId,setReferrerId]= useState('')

  useEffect(()=>{
   const id =  localStorage.getItem("referrerId")
   if (id) setReferrerId(id);
  },[])

  const { tableProps, filters } = useTable< ReferrerTrafficRecord, HttpError, ReferrerTrafficRecord>({
    resource: `referrers/${referrerId}/traffic`,
    // onSearch: (values) => {
    //   return [
    //     {
    //       field: "email",
    //       operator: "contains",
    //       value: values.user.email,
    //     },
    //   ];
    // },
    // sorters: {
    //   initial: [
    //     {
    //       field: "hu",
    //       order: "asc",
    //     },
    //   ],
    // },
    // filters: {
    //   initial: [
    //     {
    //       field: "name",
    //       operator: "contains",
    //       value: undefined,
    //     },
    //   ],
    // },
    // pagination: {
    //   pageSize: 1,
    // }
  });

  const [pageSize, setPageSize] = useState(12); 
  const [currentPage, setCurrentPage] = useState(1); // Установите текущую страницу

  const handlePageChange = (page:number , pageSize:number ) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };
  return (
    <Table
      {...tableProps}
      pagination={{
        ...tableProps.pagination,
        pageSize,
        current: currentPage,
        pageSizeOptions: ["12", "24", "48", "96"],
        onChange: handlePageChange,
        showTotal: (total) => <PaginationTotal total={total} entityName="traffic" />,
      }}
      rowKey="id"
    >
      <Table.Column
        dataIndex="email"
        title="User email"
        defaultFilteredValue={getDefaultFilter("id", filters)}
        filterIcon={<SearchOutlined />}
        filterDropdown={(props) => (
          <FilterDropdown {...props}>
            <Input placeholder="Search User" />
          </FilterDropdown>
        )}
        render={(_, traffic) => <Text>{traffic.user?.email}</Text>}
      />
     <Table.Column
  dataIndex="status"
  title="Status"
  render={(_, traffic) => {
    const statusText = traffic.status === 'confirmed' ? 'Confirmed' : 'Not confirmed';
    const statusColor = traffic.status === 'confirmed' ? 'green' : 'red';

    return <Text style={{ color: statusColor }}>{statusText}</Text>;
  }}
/>
      <Table.Column
        dataIndex="date"
        title="Date"
        render={(_, traffic) => <Text>{new Date(traffic.updatedAt).toLocaleString('ru-RU')}</Text>}
      />
    </Table>
  );
};
