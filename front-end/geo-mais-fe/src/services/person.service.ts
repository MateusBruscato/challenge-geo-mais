import { PersonDeleteInterface, PersonInterfaceFilter, PersonPatchInterface, PersonPostInterface, PersonServiceInterface } from "../interfaces/person.interface";
import fetch from '../config/Fetch';

const getPeople = async () => {
    const result = await fetch({
        url: `/pessoas`,
        method: 'get'
    })
    return result.data;
};

const findPersonById = async (id: number | string) => {
    const result = await fetch({
        url: `/pessoas/${id}`,
        method: 'get'
    })
    return result.data;
};

const getPersonByFilter = async (data: PersonInterfaceFilter) => {
    let k: keyof PersonInterfaceFilter;
    for (k in data) {
        if (data[k] === undefined) delete data[k];
    }
    const searchParams = new URLSearchParams(data);

    const result = await fetch({
        url: `/pessoas/filter?${searchParams}`,
        method: 'get',
    });

    return result.data;
};

const createPerson = async (data: PersonPostInterface) => {
    const result = await fetch({
        url: `/pessoas/`,
        method: 'post',
        data
    })
    return result.data;
};

const updatePerson = async (data: PersonPatchInterface) => {
    const result = await fetch({
        url: `/pessoas/${data.id}`,
        method: 'patch',
        data
    })
    return result.data;
};

const deletePerson = async (data: PersonDeleteInterface) => {
    const result = await fetch({
        url: `/pessoas/${data.id}`,
        method: 'delete',
    })
    return result.data;
};


const personService: PersonServiceInterface = {
    getPeople,
    getPersonByFilter,
    createPerson,
    deletePerson,
    updatePerson,
    findPersonById
};

export default personService;