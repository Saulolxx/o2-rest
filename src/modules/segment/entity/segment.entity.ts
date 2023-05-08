import { Certification } from 'src/modules/certification/entities/certification.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'Segment' })
export class Segment {
  @PrimaryGeneratedColumn({
    name: 'id',
    unsigned: true,
    type: 'int',
  })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 500 })
  name: string;

  @OneToMany(() => Segment, (segment) => segment.certifications)
  certifications: Certification[];
}
