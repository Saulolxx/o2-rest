import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableInterview1682624161141 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Interview',
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
            name: 'candidate_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'timestamptz',
            isNullable: false,
          },
          {
            name: 'note',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'meeting_link',
            type: 'varchar',
            isNullable: true,
            length: '200',
          },
        ],
      }),
      true,
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

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('Interview');
    const personForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('candidate_id') !== -1,
    );
    await queryRunner.dropForeignKey('Interview', personForeignKey);

    await queryRunner.dropTable('Interview');
  }
}
