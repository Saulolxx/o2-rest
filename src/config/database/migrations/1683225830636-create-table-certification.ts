import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableCertification1683225830636
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Certification',
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
            name: 'segment_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'title',
            type: 'varchar',
            length: '500',
            isNullable: false,
          },
          {
            name: 'issuance',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'education_institution',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          {
            name: 'expiration',
            type: 'date',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'Certification',
      new TableForeignKey({
        columnNames: ['person_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Person',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'Certification',
      new TableForeignKey({
        columnNames: ['segment_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Segment',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('Certification');

    const personForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('person_id') !== -1,
    );

    const segmentForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('segment_id') !== -1,
    );
    if (personForeignKey) {
      await queryRunner.dropForeignKey('Certification', personForeignKey);
    }
    if (segmentForeignKey) {
      await queryRunner.dropForeignKey('Certification', segmentForeignKey);
    }
    await queryRunner.dropTable('Certification');
  }
}
