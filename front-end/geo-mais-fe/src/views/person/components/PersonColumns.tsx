import { PersonInterface } from "../../../interfaces/person.interface";
import type { ColumnsType } from "antd/es/table";
import { maskCPF } from "../../../helpers/masks.helper";

const personColumns: ColumnsType<PersonInterface> = [
  {
    title: "Nome",
    dataIndex: "nome",
    key: "nome",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "CPF",
    dataIndex: "cpf",
    key: "cpf",
    render: (text) => <>{maskCPF(text)}</>,
  },
  {
    title: "RG",
    dataIndex: "rg",
    key: "rg",
  },
  {
    title: "Data de nascimento",
    dataIndex: "data_nasc",
    key: "data_nasc",
  },
  {
    title: "Sexo",
    dataIndex: "sexo",
    key: "sexo",
  },
];

export default personColumns;
