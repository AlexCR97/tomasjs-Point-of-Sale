import { ProductEntity, WarehouseEntity } from "@/domain/entities";
import { createMap } from "@automapper/core";
import { ProductDocument, WarehouseDocument } from "../mongo/documents";
import { mapper } from "./mapper";

createMap(mapper, ProductEntity, ProductDocument);
createMap(mapper, ProductDocument, ProductEntity);

createMap(mapper, WarehouseEntity, WarehouseDocument);
createMap(mapper, WarehouseDocument, WarehouseEntity);
