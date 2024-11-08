import {MigrationInterface, QueryRunner} from "typeorm";

export class detallePedidoV31731106838055 implements MigrationInterface {
    name = 'detallePedidoV31731106838055'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pedido" DROP CONSTRAINT "FK_8132e5f30294d990368727416cb"`);
        await queryRunner.query(`ALTER TABLE "pedido" RENAME COLUMN "detallesId" TO "total"`);
        await queryRunner.query(`ALTER TABLE "pedido" DROP COLUMN "total"`);
        await queryRunner.query(`ALTER TABLE "pedido" ADD "total" numeric NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pedido" DROP COLUMN "total"`);
        await queryRunner.query(`ALTER TABLE "pedido" ADD "total" integer`);
        await queryRunner.query(`ALTER TABLE "pedido" RENAME COLUMN "total" TO "detallesId"`);
        await queryRunner.query(`ALTER TABLE "pedido" ADD CONSTRAINT "FK_8132e5f30294d990368727416cb" FOREIGN KEY ("detallesId") REFERENCES "detalle_pedido"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
