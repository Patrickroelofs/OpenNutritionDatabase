CREATE TABLE "products" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "products_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"barcodeId" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	CONSTRAINT "products_barcodeId_unique" UNIQUE("barcodeId")
);
--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_barcodeId_barcodes_id_fk" FOREIGN KEY ("barcodeId") REFERENCES "public"."barcodes"("id") ON DELETE cascade ON UPDATE no action;