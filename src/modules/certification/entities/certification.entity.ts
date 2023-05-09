import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Person } from '../../person/entity/person.entity';
import { Segment } from 'src/modules/segment/entity/segment.entity';

@Entity('Certification')
export class Certification {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'title', length: 500, type: 'varchar' })
  title: string;

  @Column({ name: 'issuance', type: 'date' })
  issuance: Date;

  @Column({ name: 'education_institution', length: 500, type: 'varchar' })
  educationInstitution: string;

  @Column({ name: 'expiration', type: 'date' })
  expiration: Date;

  @ManyToOne(() => Person, (person) => person.certifications)
  @JoinColumn({ name: 'person_id' })
  person: Person;

  @Column({ name: 'person_id', type: 'int' })
  personId: number;

  @ManyToOne(() => Segment, (segment) => segment.certifications)
  @JoinColumn({ name: 'segment_id' })
  segment: Segment;

  @Column({ name: 'segment_id', type: 'int' })
  segmentId: number;
}
