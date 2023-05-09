import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableDegree1682624161141 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Degree',
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
            name: 'person_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
            length: '200',
          },
          {
            name: 'education_institution',
            type: 'varchar',
            isNullable: true,
            length: '200',
          },
          {
            name: 'degree_modality_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'degree_situation_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'started_at',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'finished_at',
            type: 'date',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'Degree',
      new TableForeignKey({
        columnNames: ['person_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Person',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'Degree',
      new TableForeignKey({
        columnNames: ['degree_modality_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'DegreeModality',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'Degree',
      new TableForeignKey({
        columnNames: ['degree_situation_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'DegreeSituation',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('Degree');
    const personForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('person_id') !== -1,
    );
    const degreeModalityForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('degree_modality_id') !== -1,
    );
    const degreeSituationForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('degree_situation_id') !== -1,
    );

    await queryRunner.dropForeignKey('Degree', personForeignKey);
    await queryRunner.dropForeignKey('Degree', degreeModalityForeignKey);
    await queryRunner.dropForeignKey('Degree', degreeSituationForeignKey);

    await queryRunner.dropTable('Degree');
  }
}
