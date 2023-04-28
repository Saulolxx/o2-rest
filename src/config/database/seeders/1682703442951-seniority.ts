import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeederSeniority1682703442951 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "Seniority" ("id","label","order","is_active") VALUES (5,'Estagiário',1,true),
        (3,'Júnior I',2,true),
        (8,'Júnior II',3,true),
        (7,'Júnior III',4,true),
        (1,'Pleno I',5,true),
        (2,'Pleno II',6,true),
        (6,'Pleno III',7,true),
        (4,'Senior',8,true),
        (10,'Especialista',9,true),
        (9,'Consultor',10,true);
    `);

    await queryRunner.query(
      `SELECT SETVAL('"Seniority_id_seq"', (SELECT MAX(id) FROM "Seniority"));`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "Seniority" WHERE id IN (1,2,3,4,5,6,7,8,9,10);
    `);
  }
}
