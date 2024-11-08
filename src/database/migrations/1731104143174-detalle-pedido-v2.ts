import {MigrationInterface, QueryRunner} from "typeorm";

export class detallePedidoV21731104143174 implements MigrationInterface {
    name = 'detallePedidoV21731104143174'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "detalle_pedido" ADD "precio" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedido" ALTER COLUMN "date" SET DEFAULT ('now'::text)::date`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pedido" ALTER COLUMN "date" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "detalle_pedido" DROP COLUMN "precio"`);
    }

}
