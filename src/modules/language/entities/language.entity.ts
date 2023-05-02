import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Language' })
export class Language {
  @PrimaryGeneratedColumn({
    name: 'id',
    unsigned: true,
    type: 'int',
  })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 200 })
  name: string;
}
