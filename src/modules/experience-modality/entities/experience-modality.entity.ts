import { Experience } from 'src/modules/experience/entities/experience.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('ExperienceModality')
export class ExperienceModality {
  @PrimaryColumn()
  id: number;

  @Column({ length: '200', type: 'varchar' })
  label: string;

  @Column({ default: 0, type: 'int' })
  order: number;

  @Column({ default: true, type: 'boolean', name: 'is_active' })
  isActive: boolean;

  @OneToMany(() => Experience, (experience) => experience.experienceModality)
  experiences: Experience[];
}
