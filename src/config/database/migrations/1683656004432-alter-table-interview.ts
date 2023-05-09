import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterTableInterview1683656004432 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'Interview',
      'candidate_id',
      new TableColumn({
        name: 'candidature_id',
        type: 'int',
        isNullable: false,
      }),
    );

    await queryRunner.createForeignKey(
      'Interview',
      new TableForeignKey({
        columnNames: ['candidature_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Candidature',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('Interview');
    const personForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('candidature_id') !== -1,
    );
    await queryRunner.dropForeignKey('Interview', personForeignKey);

    await queryRunner.changeColumn(
      'Interview',
      'candidature_id',
      new TableColumn({
        name: 'candidate_id',
        type: 'int',
        isNullable: false,
      }),
    );

    await queryRunner.createForeignKey(
      'Interview',
      new TableForeignKey({
        columnNames: ['candidate_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Person',
        onDelete: 'CASCADE',
      }),
    );
  }
}
