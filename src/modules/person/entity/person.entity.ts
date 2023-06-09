import { Candidature } from 'src/modules/candidature/entities/candidature.entity';
import { Certification } from 'src/modules/certification/entities/certification.entity';
import { Degree } from 'src/modules/degree/entities/degree.entity';
import { Experience } from 'src/modules/experience/entities/experience.entity';
import { PersonSkill } from 'src/modules/person-skill/entities/person-skill.entity';
import { PersonType } from 'src/modules/person-type/entities/person-type.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'Person' })
export class Person {
  @PrimaryGeneratedColumn({
    name: 'id',
    unsigned: true,
    type: 'int',
  })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 50 })
  name: string;

  @Column({ name: 'email', type: 'varchar', length: 250 })
  email: string;

  @Column({ name: 'linkedin', type: 'varchar', length: 150 })
  linkedin: string;

  @Column({ name: 'birthday', type: 'date' })
  birthday: Date;

  @Column({ name: 'compleoid', type: 'varchar', length: 50 })
  compleoid: string;

  @Column({ name: 'phone', type: 'varchar', length: 50 })
  phone: string;

  @Column({ name: 'country', type: 'varchar', length: 100 })
  country: string;

  @Column({ name: 'state', type: 'varchar', length: 100 })
  state: string;

  @Column({ name: 'city', type: 'varchar', length: 100 })
  city: string;

  @Column({ name: 'red_flag', type: 'boolean', default: false })
  redFlag: boolean;

  @Column({ name: 'reason_red_flag', type: 'varchar', length: 500 })
  reasonRedFlag: string;

  @OneToMany(() => Experience, (experience) => experience.person)
  experiences: Experience[];

  @OneToMany(() => Person, (person) => person.certifications)
  certifications: Certification[];
  @OneToMany(() => Degree, (degree) => degree.person)
  degrees: Degree[];

  @OneToMany(() => Candidature, (candidature) => candidature.person)
  candidatures: Candidature[];

  @OneToMany(() => PersonSkill, (personSkill) => personSkill.person)
  personsSkills: PersonSkill[];

  @ManyToOne(() => PersonType, (personType) => personType.persons)
  @JoinColumn({ name: 'person_type_id' })
  personType: PersonType;

  @Column({ name: 'person_type_id', type: 'int' })
  personTypeId: number;
}
