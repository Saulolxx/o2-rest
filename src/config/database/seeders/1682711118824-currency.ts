import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeederCurrency1682711118824 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "Currency" ("id","label","order","is_active") VALUES
      (4,'R$',1,true),
      (1,'€',2,true),
      (3,'US$',3,true),
      (2,'£',4,true),
      (8,'¥',5,true),
      (6,'Mex$',6,true),
      (7,'Bs',7,true),
      (5,'C$',8,true);
    `);

    await queryRunner.query(
      `SELECT SETVAL('"Currency_id_seq"', (SELECT MAX(id) FROM "Currency"));`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "Currency" WHERE id IN (1,2,3,4,5,6,7,8);
    `);
  }
}
