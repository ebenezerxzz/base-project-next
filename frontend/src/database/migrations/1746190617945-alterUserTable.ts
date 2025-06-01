import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterUserTable1746190617945 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            "user",
            "id",
            new TableColumn({
                name: "id",
                type: "int",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment"
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}