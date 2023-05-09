import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableCandidature1682624161141 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Candidature',
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
            name: 'person_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'subscribed_at',
            type: 'timestamptz',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'Candidature',
      new TableForeignKey({
        columnNames: ['person_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Person',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'Candidature',
      new TableForeignKey({
        columnNames: ['vacancy_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Vacancy',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('Candidature');

    const personForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('person_id') !== -1,
    );
    const vacancyForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('vacancy_id') !== -1,
    );

    await queryRunner.dropForeignKey('Candidature', personForeignKey);
    await queryRunner.dropForeignKey('Candidature', vacancyForeignKey);

    await queryRunner.dropTable('Candidature');
  }
}
