"use client";
// antd
import { Card, Col, Row, Typography } from "antd";

// constants
import { membershipPlan } from "@/data/membershipPlan";

// assets
import RightIcon from "@/data/rightICon";

// css
import "./membershipPlanSection.css";

const MemberShipPlanSection = () => {
  const { Text, Title } = Typography;

  // const navigate = useNavigate();

  return (
    <>
      <div className="membershipPlanContainer">
        <Row className="membershipPlanRow">
          <div>
            <Title
              style={{
                margin: 0,
                color: "#030945",
                fontSize: "40px",
                fontWeight: 700,
                textAlign: "center",
              }}
              className="membershipPlanTitle"
              level={2}
            >
              Subscription Plans
            </Title>
          </div>
          <Row
            gutter={[20, 20]}
            align={"center"}
            justify={"center"}
            style={{
              marginTop: "62px",
            }}
          >
            {membershipPlan?.length > 0 &&
              membershipPlan.map((data) => {
                return (
                  <Col
                    className="membershipPlanColumn"
                    xs={24}
                    sm={24}
                    md={24}
                    lg={24}
                    xl={8}
                    xxl={8}
                  >
                    <Card className="planCard">
                      <div
                        className="planTitle"
                        style={{
                          backgroundColor: data?.color,
                        }}
                      >
                        <Title
                          level={4}
                          style={{
                            fontWeight: 700,
                            margin: "15px 0px 0px 0px",
                            textAlign: "center",
                          }}
                        >
                          {data?.subName}
                        </Title>
                      </div>
                      <div className="planDescriptionContainer">
                        {data?.description?.length > 0 &&
                          data?.description.map((description) => (
                            <>
                              <Row
                                className="planDescriptionRow"
                                style={{
                                  alignItems: "baseline",
                                }}
                              >
                                <div className="planDescriptionIcon">
                                  <RightIcon />
                                </div>
                                <Text className="planDescriptionText">
                                  {description}
                                </Text>
                              </Row>
                            </>
                          ))}
                        <div className="form-group col-lg-12 col-md-12 text-center">
                          <button
                            className="theme-btn btn-style-one"
                            data-bs-toggle="modal"
                            data-bs-target="#registerModal"
                          >
                            Register Now
                          </button>
                        </div>
                      </div>
                    </Card>
                  </Col>
                );
              })}
          </Row>
        </Row>
      </div>
    </>
  );
};

export default MemberShipPlanSection;
