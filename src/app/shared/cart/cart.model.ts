import { Product } from "app/products/data-access/product.model";

export type Cart = Array<Partial<Product> & Pick<Product, "id" | "quantity">>;
