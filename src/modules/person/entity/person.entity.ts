import { Experience } from 'src/modules/experience/entities/experience.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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
}
