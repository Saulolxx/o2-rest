import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeederExperienceRegime1682712736210 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "ExperienceRegime" ("id","label","order","is_active") VALUES
      (4,'CLT',1,true),
      (3,'PJ',2,true),
      (2,'Cooperado',3,true),
      (1,'Estagio',4,true);
    `);

    await queryRunner.query(
      `SELECT SETVAL('"ExperienceRegime_id_seq"', (SELECT MAX(id) FROM "ExperienceRegime"));`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "ExperienceRegime" WHERE id IN (1,2,3,4);
    `);
  }
}
