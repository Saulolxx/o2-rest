import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableSkill1683657931626 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Skill',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
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
            isNullable: true,
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
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Skill');
  }
}
