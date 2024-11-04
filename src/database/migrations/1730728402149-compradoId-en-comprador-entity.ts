import { MigrationInterface, QueryRunner } from 'typeorm';

export class compradoIdEnCompradorEntity1730728402149 implements MigrationInterface {
  name = 'compradoIdEnCompradorEntity1730728402149';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "operador" DROP CONSTRAINT "FK_9a6bd793b4f149fb11d8692ed75"`,
    );
    // await queryRunner.query(`ALTER TABLE "operador" ALTER COLUMN "compradorId" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "operador" ADD CONSTRAINT "FK_9a6bd793b4f149fb11d8692ed75" FOREIGN KEY ("compradorId") REFERENCES "comprador"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "operador" DROP CONSTRAINT "FK_9a6bd793b4f149fb11d8692ed75"`,
    );
    await queryRunner.query(`ALTER TABLE "operador" ALTER COLUMN "compradorId" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "operador" ADD CONSTRAINT "FK_9a6bd793b4f149fb11d8692ed75" FOREIGN KEY ("compradorId") REFERENCES "comprador"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
