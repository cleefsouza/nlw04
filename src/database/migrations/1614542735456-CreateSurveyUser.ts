import { query } from 'express';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSurveyUser1614542735456 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'survey_user',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
					},
					{
						name: 'user_id',
						type: 'uuid',
					},
					{
						name: 'survey_id',
						type: 'uuid',
					},
					{
						name: 'value',
						type: 'number',
						isNullable: true,
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'now()',
					},
				],
				foreignKeys: [
					{
						name: 'FKUser',
						referencedTableName: 'user',
						referencedColumnNames: ['id'],
						columnNames: ['user_id'],
						onDelete: 'CASCADE',
						onUpdate: 'CASCADE',
					},
					{
						name: 'FKSurvey',
						referencedTableName: 'survey',
						referencedColumnNames: ['id'],
						columnNames: ['survey_id'],
						onDelete: 'CASCADE',
						onUpdate: 'CASCADE',
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('survey_user');
	}
}
