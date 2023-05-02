import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeederExperienceModality1683029850900
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "ExperienceModality" ("id","label","order","is_active") VALUES
        (2,'Presencial',1,true),
        (3,'Remoto',2,true),
        (1,'Hibrido',3,true);
    `);

    await queryRunner.query(
      `SELECT SETVAL('"ExperienceModality_id_seq"', (SELECT MAX(id) FROM "ExperienceModality"));`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "ExperienceModality" WHERE id IN (1,2,3);
    `);
  }
}
