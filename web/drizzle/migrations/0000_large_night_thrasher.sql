CREATE TABLE "barcodes" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "barcodes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"barcode" varchar(13) NOT NULL,
	CONSTRAINT "barcodes_barcode_unique" UNIQUE("barcode")
);
