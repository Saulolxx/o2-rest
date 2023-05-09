import { Person } from 'src/modules/person/entity/person.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('Interview')
export class Interview {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'date', type: 'timestamptz' })
  date: Date;

  @Column({ name: 'note', type: 'text' })
  note: string;

  @Column({ name: 'meeting_link', length: '200', type: 'varchar' })
  meetingLink: string;

  @ManyToOne(() => Person, (candidate) => candidate.interviews)
  @JoinColumn({ name: 'candidate_id' })
  candidate: Person;

  @Column({ name: 'candidate_id', type: 'int' })
  candidateId: number;
}
