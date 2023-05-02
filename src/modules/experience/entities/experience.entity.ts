import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Person } from '../../person/entity/person.entity';
import { ExperienceModality } from 'src/modules/experience-modality/entities/experience-modality.entity';
import { ExperienceRegime } from 'src/modules/experience-regime/entities/experience-regime.entity';
import { Currency } from 'src/modules/currency/entities/currency.entity';

@Entity('Experience')
export class Experience {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'company', length: 200, type: 'varchar' })
  company: string;

  @Column({ name: 'role', length: 200, type: 'varchar' })
  role: string;

  @Column({ name: 'description', length: 2500, type: 'varchar' })
  description: string;

  @Column({ name: 'salary', type: 'int' })
  salary: number;

  @Column({ name: 'start_date', type: 'date' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date' })
  endDate: Date;

  @ManyToOne(() => Person, (person) => person.experiences)
  @JoinColumn({ name: 'person_id' })
  person: Person;

  @Column({ name: 'person_id', type: 'int' })
  personID: number;

  @ManyToOne(
    () => ExperienceModality,
    (experienceModality) => experienceModality.experiences,
  )
  @JoinColumn({ name: 'experience_modality_id' })
  experienceModality: ExperienceModality;

  @Column({ name: 'experience_modality_id', type: 'int' })
  experienceModalityID: number;

  @ManyToOne(
    () => ExperienceRegime,
    (experienceRegime) => experienceRegime.experiences,
  )
  @JoinColumn({ name: 'experience_regime_id' })
  experienceRegime: ExperienceRegime;

  @Column({ name: 'experience_regime_id', type: 'int' })
  experienceRegimeID: number;

  @ManyToOne(() => Currency, (currency) => currency.experiences)
  @JoinColumn({ name: 'currency_id' })
  currency: Currency;

  @Column({ name: 'currency_id', type: 'int' })
  currencyID: number;
}
