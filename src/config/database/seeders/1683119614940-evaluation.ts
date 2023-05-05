import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeederEvaluation1683119614940 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "Evaluation" ("id","label","order","is_active") VALUES
      (1,'Deficient',1,true),
      (2,'Poor',2,true),
      (3,'Fair',3,true),
      (4,'Good',4,true),
      (5,'Very Good',5,true),
      (6,'Outstanding',6,true);
    `);

    await queryRunner.query(
      `SELECT SETVAL('"Evaluation_id_seq"', (SELECT MAX(id) FROM "Evaluation"));`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "Evaluation" WHERE id IN (1,2,3,4,5,6);
    `);
  }
}
