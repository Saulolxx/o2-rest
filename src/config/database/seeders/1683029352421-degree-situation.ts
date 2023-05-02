import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeederDegreeSituation1683029352421 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "DegreeSituation" ("id","label","order","is_active") VALUES
        (2,'Em Andamento',1,true),
        (3,'Pausado',2,true),
        (1,'Concluido',3,true);
    `);

    await queryRunner.query(
      `SELECT SETVAL('"DegreeSituation_id_seq"', (SELECT MAX(id) FROM "DegreeSituation"));`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "DegreeSituation" WHERE id IN (1,2,3);
    `);
  }
}
