import { Candidature } from 'src/modules/candidature/entities/candidature.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('Interview')
export class Interview {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'date', type: 'timestamptz' })
  date: Date;

  @Column({ name: 'note', type: 'text' })
  note: string;

  @Column({ name: 'meeting_link', length: '200', type: 'varchar' })
  meetingLink: string;

  @ManyToOne(() => Candidature, (candidature) => candidature.interviews)
  @JoinColumn({ name: 'candidature_id' })
  candidature: Candidature;

  @Column({ name: 'candidature_id', type: 'int' })
  candidatureId: number;
}
