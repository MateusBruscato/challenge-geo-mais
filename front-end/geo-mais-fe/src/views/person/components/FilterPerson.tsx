import React from "react";
import { Card, Form, Input, Radio, Button, Col, Row, message } from "antd";
import { usePerson } from "../../../stores/person.store";
import { PersonInterfaceFilter } from "../../../interfaces/person.interface";

type Props = {};

export default function FilterPerson({}: Props) {
  const [form] = Form.useForm();

  const { getPersonByFilter, getPeople } = usePerson();

  const onFinish = (values: PersonInterfaceFilter) => {
    getPersonByFilter(values).then((result) => {
      if (result instanceof Error)
        return message.error("Falha ao carregar dados.");
    });
  };

  const handleFormClear = () => {
    form.resetFields();
    getPeople();
  };

  return (
    <Card
      title="Filtrar pessoas"
      style={{ marginBottom: "1rem" }}
      bodyStyle={{ paddingBottom: "0" }}
    >
      <Form
        name="filter"
        form={form}
        onFinish={onFinish}
      >
        <Row
          gutter={30}
          justify={"space-between"}
        >
          <Col span={4}>
            <Form.Item
              label="Nome"
              name="nome"
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item
              label="CPF"
              name="cpf"
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item
              label="RG"
              name="rg"
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item
              label="Data nascimento"
              name="data_nasc"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label="Sexo"
              name="sexo"
            >
              <Radio.Group>
                <Radio value="Masculino">Masculino</Radio>
                <Radio value="Feminino">Feminino</Radio>
                <Radio value="Outro">Outro</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <Row
          gutter={20}
          justify="end"
        >
          <Col>
            <Button
              type="default"
              onClick={handleFormClear}
            >
              Limpar Filtros
            </Button>
          </Col>
          <Col>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
              >
                Buscar
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}
