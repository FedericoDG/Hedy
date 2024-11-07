import {MigrationInterface, QueryRunner} from "typeorm";

export class categoriaProductoManyToManyV21731004416379 implements MigrationInterface {
    name = 'categoriaProductoManyToManyV21731004416379'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "producto_categorias" ("categoria_id" integer NOT NULL, "producto_id" integer NOT NULL, CONSTRAINT "PK_8ee9d12079c176d64083427ca88" PRIMARY KEY ("categoria_id", "producto_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0e59d83b1351c818d2d0209f55" ON "producto_categorias" ("categoria_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_cc2f5a7f4d3caef26d558ff581" ON "producto_categorias" ("producto_id") `);
        await queryRunner.query(`ALTER TABLE "producto_categorias" ADD CONSTRAINT "FK_0e59d83b1351c818d2d0209f55f" FOREIGN KEY ("categoria_id") REFERENCES "categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "producto_categorias" ADD CONSTRAINT "FK_cc2f5a7f4d3caef26d558ff581b" FOREIGN KEY ("producto_id") REFERENCES "producto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "producto_categorias" DROP CONSTRAINT "FK_cc2f5a7f4d3caef26d558ff581b"`);
        await queryRunner.query(`ALTER TABLE "producto_categorias" DROP CONSTRAINT "FK_0e59d83b1351c818d2d0209f55f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cc2f5a7f4d3caef26d558ff581"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0e59d83b1351c818d2d0209f55"`);
        await queryRunner.query(`DROP TABLE "producto_categorias"`);
    }

}
