import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeederDegreeModality1682709467125 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "DegreeModality" ("id","label","order","is_active") VALUES
        (2,'Ensino Médio',1,true),
        (9,'Técnico',2,true),
        (7,'Licenciatura',3,true),
        (5,'Tecnologo',4,true),
        (3,'Bacharel',5,true),
        (1,'Pós Graduação',6,true),
        (4,'Mestrado',7,true),
        (6,'Doutorado',8,true),
        (8,'PHD (pós-doutorado)',9,true);
    `);

    await queryRunner.query(
      `SELECT SETVAL('"DegreeModality_id_seq"', (SELECT MAX(id) FROM "DegreeModality"));`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "DegreeModality" WHERE id IN (1,2,3,4,5,6,7,8);
    `);
  }
}
