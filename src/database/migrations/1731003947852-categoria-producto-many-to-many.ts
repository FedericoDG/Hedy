import { MigrationInterface, QueryRunner } from 'typeorm';

export class categoriaProductoManyToMany1731003947852 implements MigrationInterface {
  name = 'categoriaProductoManyToMany1731003947852';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "categoria" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "categoria" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "producto" DROP CONSTRAINT "FK_2bdf10c8cf693441c6f240ad6d5"`,
    );
    await queryRunner.query(`ALTER TABLE "producto" ALTER COLUMN "fabricanteId" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "producto" ADD CONSTRAINT "FK_2bdf10c8cf693441c6f240ad6d5" FOREIGN KEY ("fabricanteId") REFERENCES "fabricante"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "producto" DROP CONSTRAINT "FK_2bdf10c8cf693441c6f240ad6d5"`,
    );
    await queryRunner.query(`ALTER TABLE "producto" ALTER COLUMN "fabricanteId" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "producto" ADD CONSTRAINT "FK_2bdf10c8cf693441c6f240ad6d5" FOREIGN KEY ("fabricanteId") REFERENCES "fabricante"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "createdAt"`);
  }
}
