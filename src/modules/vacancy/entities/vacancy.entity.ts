import { Candidature } from 'src/modules/candidature/entities/candidature.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('Vacancy')
export class Vacancy {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'title', length: '200', type: 'varchar' })
  title: string;

  @Column({ name: 'compleoid', length: '200', type: 'varchar' })
  compleoid: string;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @OneToMany(() => Candidature, (candidature) => candidature.person)
  candidatures: Candidature[];
}
