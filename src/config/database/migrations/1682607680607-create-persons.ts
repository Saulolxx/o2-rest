import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePersons1682607680607 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Person',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
            isGenerated: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
            length: '50',
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
            length: '250',
          },
          {
            name: 'linkedin',
            type: 'varchar',
            isNullable: true,
            length: '150',
          },
          {
            name: 'birthday',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'compleoid',
            type: 'varchar',
            isNullable: true,
            length: '50',
          },
          {
            name: 'phone',
            type: 'varchar',
            isNullable: false,
            length: '50',
          },
          {
            name: 'country',
            type: 'varchar',
            isNullable: true,
            length: '100',
          },
          {
            name: 'state',
            type: 'varchar',
            isNullable: true,
            length: '100',
          },
          {
            name: 'city',
            type: 'varchar',
            isNullable: true,
            length: '100',
          },
          {
            name: 'red_flag',
            type: 'boolean',
            isNullable: true,
            default: false,
          },
          {
            name: 'reason_red_flag',
            type: 'varchar',
            isNullable: true,
            length: '500',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Person');
  }
}
