import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
