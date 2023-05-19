import { Person } from 'src/modules/person/entity/person.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('PersonType')
export class PersonType {
  @PrimaryColumn()
  id: number;

  @Column({ length: '200', type: 'varchar' })
  label: string;

  @Column({ default: 0, type: 'int' })
  order: number;

  @Column({ default: true, type: 'boolean', name: 'is_active' })
  isActive: boolean;

  @OneToMany(() => Person, (person) => person.personType)
  persons: Person[];
}
