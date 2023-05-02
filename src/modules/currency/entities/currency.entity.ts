import { Experience } from 'src/modules/experience/entities/experience.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('Currency')
export class Currency {
  @PrimaryColumn()
  id: number;

  @Column({ length: '200', type: 'varchar' })
  label: string;

  @Column({ default: 0, type: 'int' })
  order: number;

  @Column({ default: true, type: 'boolean', name: 'is_active' })
  isActive: boolean;

  @OneToMany(() => Experience, (experience) => experience.currency)
  experiences: Experience[];
}
