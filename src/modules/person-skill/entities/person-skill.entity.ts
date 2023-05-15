import { Skill } from 'src/modules/skill/entities/skill.entity';
import { Person } from 'src/modules/person/entity/person.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('PersonSkill')
export class PersonSkill {
  @PrimaryColumn()
  id: number;

  @ManyToOne(() => Person, (person) => person.personsSkills)
  @JoinColumn({ name: 'person_id' })
  person: Person;

  @Column({ name: 'person_id', type: 'int' })
  personId: number;

  @ManyToOne(() => Person, (skill) => skill.personsSkills)
  @JoinColumn({ name: 'skill_id' })
  skill: Skill;

  @Column({ name: 'skill_id', type: 'int' })
  skillId: number;
}
