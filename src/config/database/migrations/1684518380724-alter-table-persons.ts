import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterTablePersons1684518380724 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'Person',
      new TableColumn({
        name: 'person_type_id',
        type: 'int',
        isNullable: false,
      }),
    );

    await queryRunner.createForeignKey(
      'Person',
      new TableForeignKey({
        columnNames: ['person_type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'PersonType',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('Person');
    const personTypeForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('person_type_id') !== -1,
    );
    await queryRunner.dropForeignKey('Person', personTypeForeignKey);

    await queryRunner.dropColumn('Person', 'person_type_id');
  }
}
