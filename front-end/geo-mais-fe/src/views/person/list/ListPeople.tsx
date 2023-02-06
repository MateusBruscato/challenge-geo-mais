import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  message,
  Popconfirm,
  Row,
  Table,
  Typography,
} from "antd";
import React from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  PersonDeleteInterface,
  PersonInterface,
} from "../../../interfaces/person.interface";

import { usePerson } from "../../../stores/person.store";
import FilterPerson from "../components/FilterPerson";
import personColumns from "../components/PersonColumns";

const { Title } = Typography;
type Props = {};

export default function ListPeople({}: Props) {
  const columns = [
    ...personColumns,
    {
      title: "Ações",
      key: "actions",
      render: (text: string, record: PersonInterface) => (
        <>
          <EditOutlined onClick={() => handleEditPerson(record.id)} />
          <Divider type="vertical" />
          <Popconfirm
            placement="topRight"
            title="Tem certeza que deseja excluir esta pessoa?"
            onConfirm={() => handleDeletePerson(record)}
            okButtonProps={{ danger: true }}
            okText="Sim"
            cancelText="Não"
          >
            <DeleteOutlined style={{ color: "red" }} />
          </Popconfirm>
        </>
      ),
    },
  ];

  const { people, getPeople, deletePerson, errorPeople, totalPeopleCount} = usePerson();
  const navigate = useNavigate();

  useEffect(() => {
    getPeople();
  }, []);

  const handleEditPerson = (id: string) => {
    return navigate(`/detalhe/${id}`);
  };

  const handleDeletePerson = (record: PersonDeleteInterface) => {
    deletePerson(record).then((result) => {
      if (!errorPeople) {
        message.success("Removida com sucesso");
      } else {
        message.error("Ocorreu um erro");
      }
    });
  };

  return (
    <div>
      <div className="content-header">
        <Title level={4}> Pessoas</Title>
        <Button
          size="large"
          type="primary"
        >
          <Link to="detalhe">Adicionar Pessoa</Link>
        </Button>
      </div>
      <div>
        <FilterPerson />
      </div>
      <Table
        bordered
        columns={columns}
        dataSource={
          people &&
          people.map((person) => ({
            key: person.id,
            id: person.id,
            nome: person.nome,
            cpf: person.cpf,
            rg: person.rg,
            data_nasc: person.data_nasc,
            sexo: person.sexo,
          }))
        }
      />
      <Divider />
      <Row
        style={{
          border: "1px solid gray",
          borderRadius: "5px",
          padding: "1rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Col>
          <Title level={4}>Total de pessoas cadastradas: </Title>
        </Col>
        <Col>
          <Title level={4}>{totalPeopleCount && totalPeopleCount}</Title>
        </Col>
      </Row>
    </div>
  );
}
