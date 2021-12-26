import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUsers1640559928299 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        isNullable: false
                    },
                    {
                        name: 'name',
                        type: 'text',
                        isNullable: false
                    },
                    {
                        name: 'email',
                        type: 'text',
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp without time zone',
                        isNullable: false,
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp without time zone',
                        isNullable: false,
                        default: 'now()'
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
