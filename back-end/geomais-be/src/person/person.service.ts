import { Person } from './../entities/person.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { FilterPersonDto } from './dto/filter-person.dto';


@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) { }
  async create(createPersonDto: CreatePersonDto) {
    const newPerson = this.personRepository.create(createPersonDto);
    await this.personRepository.save(newPerson);
    return newPerson;
  }

  findAll() {
    return this.personRepository.findAndCount();
  }

  findOne(id: number) {
    return this.personRepository.findOneBy({ id: id });
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    this.personRepository.update(id, updatePersonDto);
    const updatedPerson = await this.personRepository.findOneBy({
      id: id,
    });
    if (updatedPerson) {
      return updatedPerson;
    }

    throw new HttpException('Person not found', HttpStatus.NOT_FOUND);
  }

  async filter(query: FilterPersonDto) {
    const qb = this.personRepository.createQueryBuilder('person');

    if (query.nome) {
      qb.andWhere('person.nome like :nome', {
        nome: `%${query.nome}%`,
      });
    }

    if (query.cpf) {
      qb.andWhere('person.cpf like :cpf', {
        cpf: `%${query.cpf}%`,
      });
    }

    if (query.rg) {
      qb.andWhere('person.rg like :rg', {
        rg: `%${query.rg}%`,
      });
    }

    if (query.sexo) {
      qb.andWhere('person.sexo = :sexo', {
        sexo: query.sexo,
      });
    }

    if (query.data_nasc) {
      qb.andWhere('person.data_nasc like :data_nasc', {
        data_nasc: `%${query.data_nasc}%`,
      });
    }
    return await qb.getMany();
  }


  remove(id: number) {
    return this.personRepository.delete(id);
  }
}
