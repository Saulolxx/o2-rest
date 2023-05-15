import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableVacancySkill1683744326230
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'VacancySkill',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            unsigned: true,
            generationStrategy: 'increment',
            isGenerated: true,
          },
          {
            name: 'vacancy_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'skill_id',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'VacancySkill',
      new TableForeignKey({
        columnNames: ['vacancy_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Vacancy',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'VacancySkill',
      new TableForeignKey({
        columnNames: ['skill_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Skill',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('VacancySkill');
    const vacancyForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('vacancy_id') !== -1,
    );
    const skillForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('skill_id') !== -1,
    );

    await queryRunner.dropForeignKey('VacancySkill', vacancyForeignKey);
    await queryRunner.dropForeignKey('VacancySkill', skillForeignKey);

    await queryRunner.dropTable('VacancySkill');
  }
}
