import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('SkillLevel')
export class SkillLevel {
  @PrimaryColumn()
  id: number;

  @Column({ length: '200', type: 'varchar' })
  label: string;

  @Column({ default: 0, type: 'int' })
  order: number;

  @Column({ default: true, type: 'boolean', name: 'is_active' })
  isActive: boolean;
}
