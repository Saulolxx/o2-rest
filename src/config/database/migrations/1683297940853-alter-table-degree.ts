import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableDegree1683297940853 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'Degree',
      'education_institution',
      new TableColumn({
        name: 'education_institution',
        type: 'varchar',
        isNullable: false,
        length: '200',
      }),
    );

    await queryRunner.changeColumn(
      'Degree',
      'started_at',
      new TableColumn({
        name: 'started_at',
        type: 'date',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'Degree',
      'education_institution',
      new TableColumn({
        name: 'education_institution',
        type: 'varchar',
        isNullable: true,
        length: '200',
      }),
    );

    await queryRunner.changeColumn(
      'Degree',
      'started_at',
      new TableColumn({
        name: 'started_at',
        type: 'date',
        isNullable: true,
      }),
    );
  }
}
