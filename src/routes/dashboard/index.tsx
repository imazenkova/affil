import { useCustom, useGetIdentity } from "@refinedev/core";

import { Col, Row } from "antd";
import { API_URL } from "../../providers";
import {

  DashboardTotalCountCard,
} from "./components";
import { ReferrerTrafficRecord } from "../../types/traffic";

export const DashboardPage = () => {
  // const { data, isLoading } = useCustom<DashboardTotalCountsQuery>({
  //   url: "",
  //   method: "get",
  //   meta: { gqlQuery: DASHBOARD_TOTAL_COUNTS_QUERY },
  // });

  const { data: user } = useGetIdentity<any>();

  const id=  localStorage.getItem("referrerId");

   const { data, isLoading } = useCustom<any>({
    url: `${API_URL}/referrers/${id}/traffic`,
    method: "get",
  });
  
  const confirmedCount = data?.data?.reduce((count:number , item: ReferrerTrafficRecord) => {
    return item.status === 'confirmed' ? count + 1 : count;
  }, 0) || 0;
  
  const notConfirmedCount = data?.data?.reduce((count:number, item:ReferrerTrafficRecord) => {
    return item.status === 'not_confirmed' ? count + 1 : count;
  }, 0) || 0;
  return (
    <div className="page-container">
      <Row gutter={[32, 32]}>
        <Col xs={24} sm={24} xl={8}>
          <DashboardTotalCountCard
            resource="traffic"
             isLoading={isLoading}
            totalCount={confirmedCount}
          />  
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <DashboardTotalCountCard
            resource="contacts"  
             isLoading={isLoading}
            totalCount={notConfirmedCount}
          />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <DashboardTotalCountCard
            resource="deals"
             isLoading={isLoading}
            totalCount={data?.data.length}
          />
        </Col>
      </Row>

      <Row
        gutter={[32, 32]}
        style={{
          marginTop: "32px",
        }}
      >
        <Col
          xs={24}
          sm={24}
          xl={8}
          style={{
            height: "460px",
          }}
        >
          {/* <CalendarUpcomingEvents /> */}
        </Col>
        <Col
          xs={24}
          sm={24}
          xl={16}
          style={{
            height: "460px",
          }}
        >
          {/* <DashboardDealsChart /> */}
        </Col>
      </Row>

      <Row
        gutter={[32, 32]}
        style={{
          marginTop: "32px",
        }}
      >
        <Col xs={24}>
          {/* <DashboardLatestActivities /> */}
        </Col>
      </Row>
    </div>
  );
};
