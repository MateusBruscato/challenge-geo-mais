import create from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

import { PersonInterface, PersonPostInterface, PersonDeleteInterface, PersonPatchInterface, PersonInterfaceFilter } from '../interfaces/person.interface';
import personService from '../services/person.service';

interface PersonState {
    loadingPeople: boolean;
    person: PersonInterface | null;
    people: PersonInterface[];
    totalPeopleCount: number;
    errorPeople: any;
    getPeople(): Promise<any>;
    getPersonByFilter(query: PersonInterfaceFilter): Promise<any>;
    createPerson(data: PersonPostInterface): Promise<any>;
    deletePerson(data: PersonDeleteInterface): Promise<any>;
    updatePerson(data: PersonPatchInterface): Promise<any>;
    findPersonById(id: number | string): Promise<any>;
    setCoffeNull(): void;
}

export const usePerson = create(
    subscribeWithSelector<PersonState>((set, get) => ({
        loadingPeople: false,
        errorPeople: null,
        totalPeopleCount: 0,
        people: [],
        person: null,
        getPeople: async () => {

            try {
                const peopleResult = await personService.getPeople();
                set({
                    people: peopleResult[0],
                    totalPeopleCount: peopleResult[1]
                });
            } catch (e) {
                set({
                    people: [],
                    errorPeople: e,
                });
            } finally {
                set({ loadingPeople: false });

            }
        },
        createPerson: async (data: PersonPostInterface) => {
            set({
                loadingPeople: true,
                errorPeople: null
            });

            try {
                const result = await personService.createPerson(data);
                set({
                    people: [...get().people, result],
                });
            } catch (e) {
                set({
                    errorPeople: e,
                });
                return e;
            } finally {
                set({
                    loadingPeople: false,
                });
            }
        },
        updatePerson: async (data: PersonPatchInterface) => {
            set({
                loadingPeople: true,
                errorPeople: null
            });
            try {
                const result = await personService.updatePerson(data);

                const updatedPeople = get().people.map((person) => person.id !== data.id ? person :
                    {
                        ...person,
                        nome: person.nome,
                        cpf: person.cpf,
                        rg: person.rg,
                        data_nasc: person.data_nasc,
                        sexo: person.sexo
                    })

                set({
                    people: updatedPeople
                });

                return result;
            } catch (e) {
                set({
                    errorPeople: e,
                });
                return e;
            } finally {
                set({
                    loadingPeople: false,
                });
            }
        },
        findPersonById: async (id: number | string) => {
            set({ loadingPeople: true });
            try {
                const personResult = await personService.findPersonById(id);
                set({
                    person: personResult,
                });
            } catch (e) {
                set({
                    person: null,
                    errorPeople: e,
                });
            } finally {
                set({ loadingPeople: false });
            }
        },
        getPersonByFilter: async (query: PersonInterfaceFilter) => {
            set({ loadingPeople: true });
            try {
                let personResult = await personService.getPersonByFilter(query);
                set({
                    people: personResult,
                });
            } catch (e) {
                set({
                    people: [],
                    errorPeople: e,
                });
                return e;
            } finally {
                set({ loadingPeople: false });
            }
        },
        deletePerson: async (data: PersonDeleteInterface) => {
            set({
                loadingPeople: true,
                errorPeople: null
            });
            try {

                const result = await personService.deletePerson(data);
                const peopleList = get().people.filter((person) => person.id !== data.id ? person : undefined);
                console.log(peopleList);
                set({
                    people: peopleList
                });

                return result;
            } catch (e) {
                set({
                    errorPeople: e,
                });
                return e;
            } finally {
                set({
                    loadingPeople: false,
                });
            }
        },
        setCoffeNull: () => {
            set({ person: null })
        }

    }))
);

