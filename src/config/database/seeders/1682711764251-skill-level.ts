import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeederSkillLevel1682711764251 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "SkillLevel" ("id","label","order","is_active") VALUES (1,'Iniciante',1,true),
      (3,'Intermediário',2,true),
      (2,'Avançado',3,true);
    `);

    await queryRunner.query(
      `SELECT SETVAL('"SkillLevel_id_seq"', (SELECT MAX(id) FROM "SkillLevel"));`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "SkillLevel" WHERE id IN (1,2,3);
    `);
  }
}
