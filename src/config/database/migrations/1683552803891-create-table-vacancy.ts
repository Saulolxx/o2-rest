import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableVacancy1682624161141 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Vacancy',
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
            name: 'title',
            type: 'varchar',
            isNullable: false,
            length: '200',
          },
          {
            name: 'compleoid',
            type: 'varchar',
            isNullable: true,
            length: '200',
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Vacancy');
  }
}
