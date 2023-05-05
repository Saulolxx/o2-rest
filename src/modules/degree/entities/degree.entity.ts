import { DegreeModality } from 'src/modules/degree-modality/entities/degree-modality.entity';
import { DegreeSituation } from 'src/modules/degree-situation/entities/degree-situation.entity';
import { Person } from 'src/modules/person/entity/person.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('Degree')
export class Degree {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'title', length: '200', type: 'varchar' })
  title: string;

  @Column({ name: 'education_institution', length: '200', type: 'varchar' })
  educationInstitution: string;

  @Column({ name: 'started_at', type: 'date' })
  startedAt: Date;

  @Column({ name: 'finished_at', type: 'date' })
  finishedAt: Date;

  @ManyToOne(() => Person, (person) => person.degrees)
  @JoinColumn({ name: 'person_id' })
  person: Person;

  @Column({ name: 'person_id', type: 'int' })
  personID: number;

  @ManyToOne(() => DegreeModality, (degreeModality) => degreeModality.degrees)
  @JoinColumn({ name: 'degree_modality_id' })
  degreeModality: DegreeModality;

  @Column({ name: 'degree_modality_id', type: 'int' })
  degreeModalityID: number;

  @ManyToOne(
    () => DegreeSituation,
    (degreeSituation) => degreeSituation.degrees,
  )
  @JoinColumn({ name: 'degree_situation_id' })
  degreeSituation: DegreeSituation;

  @Column({ name: 'degree_situation_id', type: 'int' })
  degreeSituationID: number;
}
