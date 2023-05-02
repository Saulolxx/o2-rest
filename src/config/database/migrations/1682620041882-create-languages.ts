import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateLanguages1682620041882 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Language',
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
            length: '200',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Language');
  }
}
