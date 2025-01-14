import { Injectable, signal, WritableSignal } from "@angular/core";
import { Product } from "app/products/data-access/product.model";
import { Cart } from "./cart.model";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private readonly _cart: WritableSignal<Cart> = signal<Cart>([]);
  public readonly cart = this._cart.asReadonly();

  public add(product: Product): void {
    this._cart.update((cart) => {
      const productIndex = cart.findIndex((p) => p.id === product.id);

      if (productIndex > -1) {
        cart[productIndex].quantity++;
      } else {
        cart.push({
          id: product.id,
          quantity: 1,
        });
      }

      return cart.slice();
    });
  }

  public remove(id: number): void {
    this._cart.update((cart) => cart.filter((p) => p.id !== id));
  }

  public decreaseQuantity(product: Product): void {
    this._cart.update((cart) => {
      const cartProduct = cart.find((p) => p.id === product.id)!;
      if (cartProduct.quantity > 1) cartProduct.quantity--;

      return cart.slice();
    });
  }
}
