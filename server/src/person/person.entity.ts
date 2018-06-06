import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Person {

  @ObjectIdColumn()
  id: ObjectID;

  @Column({ length: 500 })
  firstName: string;

  @Column({ length: 500 })
  lastName: string;

}