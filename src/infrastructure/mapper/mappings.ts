import { ProductEntity } from "@/domain/entities";
import { createMap } from "@automapper/core";
import { ProductDocument } from "../mongo/documents";
import { mapper } from "./mapper";

createMap(mapper, ProductEntity, ProductDocument);
createMap(mapper, ProductDocument, ProductEntity);
