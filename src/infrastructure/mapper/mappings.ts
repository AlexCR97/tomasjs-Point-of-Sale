import { ProductEntity, StockItemEntity, WarehouseEntity } from "@/domain/entities";
import { createMap } from "@automapper/core";
import { ProductDocument, StockItemDocument, WarehouseDocument } from "../mongo/documents";
import { mapper } from "./mapper";

createMap(mapper, ProductEntity, ProductDocument);
createMap(mapper, ProductDocument, ProductEntity);

createMap(mapper, StockItemEntity, StockItemDocument);
createMap(mapper, StockItemDocument, StockItemEntity);

createMap(mapper, WarehouseEntity, WarehouseDocument);
createMap(mapper, WarehouseDocument, WarehouseEntity);
