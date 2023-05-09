import { Person } from 'src/modules/person/entity/person.entity';
import { Vacancy } from 'src/modules/vacancy/entities/vacancy.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('Candidature')
export class Candidature {
  @PrimaryColumn()
  id: number;

  @ManyToOne(() => Person, (person) => person.candidatures)
  @JoinColumn({ name: 'person_id' })
  person: Person;

  @Column({ name: 'person_id', type: 'int' })
  personId: number;

  @ManyToOne(() => Vacancy, (vacancy) => vacancy.candidatures)
  @JoinColumn({ name: 'vacancy_id' })
  vacancy: Vacancy;

  @Column({ name: 'vacancy_id', type: 'int' })
  vacancyId: number;

  @Column({ name: 'subscribed_at', type: 'timestamptz' })
  subscribedAt: Date;
}
