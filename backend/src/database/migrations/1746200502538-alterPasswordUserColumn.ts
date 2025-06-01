import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterPasswordUserColumn1746200502538 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            "user",
            "password",
            new TableColumn({
                name: "password",
                type: "varchar",
                length: "60",
                isNullable: false
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
