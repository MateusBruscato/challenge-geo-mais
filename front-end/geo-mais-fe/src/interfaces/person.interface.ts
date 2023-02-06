export interface PersonInterface {
    id: string;
    nome: string;
    cpf: string;
    rg: string;
    data_nasc: string;
    sexo: string;
}

export interface PersonServiceInterface {
    createPerson(data: PersonPostInterface): Promise<any>;
    getPeople(): Promise<any>;
    getPersonByFilter: (data: PersonInterfaceFilter) => Promise<any>;
    deletePerson(data: PersonDeleteInterface): Promise<any>;
    updatePerson(data: PersonPatchInterface): Promise<any>;
    findPersonById(id: number | string): Promise<any>;
}

export type PersonInterfaceFilter = {
    nome?: string;
    cpf?: string;
    rg?: string;
    data_nasc?: string;
    sexo?: string;
}


export interface PersonPostInterface {
    nome: string;
    cpf: string;
    rg: string;
    data_nasc: string;
    sexo: string;
    data?: string;
}

export interface PersonPatchInterface {
    id: string;
    nome: string;
    cpf: string;
    rg: string;
    data_nasc: string;
    sexo: string;
    data?: string;
}

export interface PersonDeleteInterface {
    id: string;
}