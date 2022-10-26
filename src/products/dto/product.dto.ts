import { Dirent } from "node:fs";
import Product from "src/entities/product.entity";

export default class ProductDto extends Product{
    pics?:Array<string>
}