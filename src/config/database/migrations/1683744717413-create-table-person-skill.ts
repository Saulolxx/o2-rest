import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTablePersonSkill1683744717413 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'PersonSkill',
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
            name: 'skill_id',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'PersonSkill',
      new TableForeignKey({
        columnNames: ['person_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Person',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'PersonSkill',
      new TableForeignKey({
        columnNames: ['skill_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Skill',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('PersonSkill');
    const personForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('person_id') !== -1,
    );
    const skillForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('skill_id') !== -1,
    );

    await queryRunner.dropForeignKey('PersonSkill', personForeignKey);
    await queryRunner.dropForeignKey('PersonSkill', skillForeignKey);
  }
}
