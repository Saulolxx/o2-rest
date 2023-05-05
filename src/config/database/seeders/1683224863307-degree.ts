import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeederDegree1683224863307 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "Degree" ("id","label","order","is_active") VALUES ();
    `);

    await queryRunner.query(
      `SELECT SETVAL('"Degree_id_seq"', (SELECT MAX(id) FROM "Degree"));`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "Degree" WHERE id IN ();
    `);
  }
}
