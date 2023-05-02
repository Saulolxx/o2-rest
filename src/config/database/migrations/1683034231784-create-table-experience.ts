import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableExperience1682624161141 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Experience',
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
            name: 'company',
            type: 'varchar',
            isNullable: false,
            length: '200',
          },
          {
            name: 'role',
            type: 'varchar',
            isNullable: false,
            length: '200',
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
            length: '2500',
          },
          {
            name: 'salary',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'start_date',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'end_date',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'person_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'experience_modality_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'experience_regime_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'currency_id',
            type: 'int',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'Experience',
      new TableForeignKey({
        columnNames: ['person_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Person',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'Experience',
      new TableForeignKey({
        columnNames: ['experience_modality_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'ExperienceModality',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'Experience',
      new TableForeignKey({
        columnNames: ['experience_regime_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'ExperienceRegime',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'Experience',
      new TableForeignKey({
        columnNames: ['currency_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Currency',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('Experience');
    const personForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('person_id') !== -1,
    );
    const experienceModalityForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('experience_modality_id') !== -1,
    );
    const experienceRegimeForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('experience_regime_id') !== -1,
    );
    const currencyForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('currency_id') !== -1,
    );

    await queryRunner.dropForeignKey('Experience', personForeignKey);
    await queryRunner.dropForeignKey(
      'Experience',
      experienceModalityForeignKey,
    );
    await queryRunner.dropForeignKey('Experience', experienceRegimeForeignKey);
    await queryRunner.dropForeignKey('Experience', currencyForeignKey);
    await queryRunner.dropTable('Experience');
  }
}
