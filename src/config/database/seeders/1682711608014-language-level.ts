import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeederLanguageLevel1682711608014 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "LanguageLevel" ("id","label","order","is_active") VALUES
      (10,'Iniciante',1,true),
      (9,'Intermediário',2,true),
      (8,'Avançado',3,true),
      (7,'Fluente / Nativo',4,true);
    `);

    await queryRunner.query(
      `SELECT SETVAL('"LanguageLevel_id_seq"', (SELECT MAX(id) FROM "LanguageLevel"));`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "LanguageLevel" WHERE id IN (7,8,9,10);
    `);
  }
}
