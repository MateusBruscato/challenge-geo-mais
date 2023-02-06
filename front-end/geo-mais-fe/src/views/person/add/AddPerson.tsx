import "dayjs/locale/pt-br";

import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Radio,
  Row,
} from "antd";
import locale from "antd/es/date-picker/locale/pt_BR";
import dayjs from "dayjs";
import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { maskCPF, maskName } from "../../../helpers/masks.helper";
import { validateCPF } from "../../../helpers/validation-cpf";
import {
  PersonPatchInterface,
  PersonPostInterface,
} from "../../../interfaces/person.interface";
import { usePerson } from "../../../stores/person.store";

type Props = {};

export default function AddPerson({}: Props) {
  const { createPerson, updatePerson, findPersonById, person } = usePerson();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      findPersonById(id);
    }
  }, []);

  useEffect(() => {
    if (person) {
      setFormValues();
    }
  }, [person]);

  const setFormValues = () => {
    form.setFieldsValue({
      id: person?.id,
      nome: person?.nome,
      cpf: person?.cpf,
      rg: person?.rg,
      data: dayjs(person?.data_nasc, "DD/MM/YYYY"),
      sexo: person?.sexo,
    });
  };

  const onChangeCPF = (field: any, value: any) => {
    return form.setFieldsValue({
      [field]: maskCPF(value),
    });
  };

  const onChangeName = (field: any, value: any) => {
    return form.setFieldsValue({
      [field]: maskName(value),
    });
  };

  const onBack = () => {
    navigate(-1);
  };

  const onFinish = async (
    values: PersonPostInterface | PersonPatchInterface
  ) => {
    delete values.data;
    values.cpf = values.cpf.replaceAll(".", "").replaceAll("-", "");
    values.rg = values.rg.replaceAll("-", "").replaceAll(".", "");

    console.log(values);
    if (id) {
      let result = await updatePerson({ ...values, id: id });
      if (result instanceof Error) message.error("Falha ao editar pessoa!");
      else {
        message.success("Pessoa editada!");
        onBack();
      }
    } else {
      let result = await createPerson(values);
      if (result instanceof Error) message.error("Falha ao adicionar pessoa!");
      else {
        message.success("Pessoa adicionada !");
        onBack();
      }
    }
  };

  const setDataNasc = (values: any) => {
    form.setFieldsValue({ data_nasc: values });
  };

  return (
    <Card
      title="Adicionar pessoa"
      style={{
        marginBottom: "1rem",
        width: "fit-content",
        justifyContent: "center",
      }}
      bodyStyle={{ paddingBottom: "0" }}
    >
      <Form
        name="add-person"
        form={form}
        onFinish={onFinish}
      >
        <Row
          gutter={30}
          justify={"center"}
        >
          <Col>
            <Form.Item
              name="id"
              hidden
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Nome"
              name="nome"
              rules={[{ required: true, message: "Nome é obrigatório." }]}
            >
              <Input
                name="nome"
                onChange={(e) => onChangeName(e.target.name, e.target.value)}
              />
            </Form.Item>
          </Col>

          <Col>
            <Form.Item
              label="CPF"
              name="cpf"
              trigger="onSubmit"
              rules={[
                { required: true, message: "CPF é obrigatório." },
                () => ({
                  validator(_, value) {
                    if (validateCPF(value) === true) {
                      return Promise.resolve();
                    }
                    if (value && value.length === 0) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject("Preencha um CPF válido!");
                    }
                  },
                }),
              ]}
            >
              <Input
                name="cpf"
                onChange={(e) => onChangeCPF(e.target.name, e.target.value)}
                minLength={14}
                maxLength={14}
              />
            </Form.Item>
          </Col>

          <Col>
            <Form.Item
              label="RG"
              name="rg"
              rules={[{ required: true, message: "RG é obrigatório." }]}
            >
              <Input
                maxLength={14}
                minLength={7}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row
          gutter={30}
          justify={"space-around"}
        >
          <Col>
            <Form.Item
              hidden
              name="data_nasc"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Data nascimento"
              name="data"
              rules={[
                {
                  required: true,
                  message: "Data de nascimento é obrigatória.",
                },
              ]}
            >
              <DatePicker
                allowClear
                placeholder="Selecione uma data"
                style={{ minWidth: "175px" }}
                locale={locale}
                format="DD/MM/YYYY"
                onBlur={(e) => setDataNasc(e.target.value)}
                disabledDate={(current) =>
                  current && current > dayjs().endOf("day")
                }
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label="Sexo"
              name="sexo"
              rules={[
                {
                  required: true,
                  message: "Sexo é obrigatório.",
                },
              ]}
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
          style={{ justifyContent: "flex-end" }}
          gutter={20}
        >
          <Col>
            <Button
              type="default"
              onClick={onBack}
            >
              Cancelar
            </Button>
          </Col>

          <Col>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
              >
                Adicionar
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}
