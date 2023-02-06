import React from "react";
import { Layout, Space, Card } from "antd";
import { Typography } from "antd";
import "./Person.css";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
const { Title } = Typography;
const { Header, Footer, Sider, Content } = Layout;

type Props = {};

function Person({}: Props) {
  return (
    <Space
      direction="vertical"
      className="w-100"
    >
      <Layout>
        <Header className="header">
          <Title level={2}>
            <Link
              to="/"
              style={{ color: "black" }}
            >
              {" "}
              Desafio GeoMais
            </Link>
          </Title>
        </Header>
        <Content className="content">
          <Card bordered>
            <Outlet />
          </Card>
        </Content>
      </Layout>
    </Space>
  );
}

export default Person;
