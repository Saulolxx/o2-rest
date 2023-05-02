import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTablePersonType1682624161141 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'PersonType',
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
            name: 'label',
            type: 'varchar',
            isNullable: false,
            length: '200',
          },
          {
            name: 'order',
            type: 'int',
            isNullable: false,
            default: 0,
          },
          {
            name: 'is_active',
            type: 'boolean',
            isNullable: false,
            default: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('PersonType');
  }
}
