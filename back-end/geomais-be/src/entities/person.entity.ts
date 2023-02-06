import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Person {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, nullable: false })
    nome: string;

    @Column({ length: 11, unique: true, nullable: false })
    cpf: string;

    @Column({ length: 14, unique: true, nullable: false })
    rg: string;

    @Column({ length: 10, nullable: false })
    data_nasc: string;

    @Column({ length: 20, nullable: false })
    sexo: string;

}