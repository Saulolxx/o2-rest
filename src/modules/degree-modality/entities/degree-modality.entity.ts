import { Degree } from 'src/modules/degree/entities/degree.entity';
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('DegreeModality')
export class DegreeModality {
  @PrimaryColumn()
  id: number;

  @Column({ length: '200', type: 'varchar' })
  label: string;

  @Column({ default: 0, type: 'int' })
  order: number;

  @Column({ default: true, type: 'boolean', name: 'is_active' })
  isActive: boolean;

  @OneToMany(() => Degree, (degree) => degree.degreeModality)
  @JoinColumn({ name: 'degree_modality_id' })
  degrees: Degree[];
}
