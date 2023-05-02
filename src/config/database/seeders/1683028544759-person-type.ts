import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeederPersonType1683028544759 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "PersonType" ("id","label","order","is_active") VALUES
      (3,'Candidato',1,true),
      (2,'Colaborador',2,true),
      (1,'Ex-Colaborador',3,true);
    `);

    await queryRunner.query(
      `SELECT SETVAL('"PersonType_id_seq"', (SELECT MAX(id) FROM "PersonType"));`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "PersonType" WHERE id IN (1,2,3);
    `);
  }
}
