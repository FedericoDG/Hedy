import {MigrationInterface, QueryRunner} from "typeorm";

export class detallePedido1731599537740 implements MigrationInterface {
    name = 'detallePedido1731599537740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "detalle_pedido" DROP CONSTRAINT "FK_4d39e79d693b68f9f35cf4238e1"`);
        await queryRunner.query(`ALTER TABLE "detalle_pedido" RENAME COLUMN "pedidoId" TO "pedido_id"`);
        await queryRunner.query(`ALTER TABLE "detalle_pedido" ADD CONSTRAINT "FK_17fc57ebe34e3bcf93c7ff79673" FOREIGN KEY ("pedido_id") REFERENCES "pedido"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "detalle_pedido" DROP CONSTRAINT "FK_17fc57ebe34e3bcf93c7ff79673"`);
        await queryRunner.query(`ALTER TABLE "detalle_pedido" RENAME COLUMN "pedido_id" TO "pedidoId"`);
        await queryRunner.query(`ALTER TABLE "detalle_pedido" ADD CONSTRAINT "FK_4d39e79d693b68f9f35cf4238e1" FOREIGN KEY ("pedidoId") REFERENCES "pedido"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
