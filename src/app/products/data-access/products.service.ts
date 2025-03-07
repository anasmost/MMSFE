import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { catchError, map, Observable, of, tap } from "rxjs";
import { Product } from "./product.model";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  private readonly http = inject(HttpClient);
  private readonly path = "/api/products";

  private readonly _products = signal<Product[]>([]);

  public readonly products = this._products.asReadonly();

  public get(): Observable<Product[]> {
    return this.http.get<Product[]>(this.path).pipe(
      catchError((error) => {
        return this.http
          .get<Product[]>("assets/products.json")
          .pipe(
            map((products) =>
              products.map((p) => ({
                ...p,
                image:
                  "https://primefaces.org/cdn/primeng/images/demo/product/" +
                  p.image,
              }))
            )
          );
      }),
      tap((products) => this._products.set(products))
    );
  }

  public create(product: Product): Observable<boolean> {
    return this.http.post<boolean>(this.path, product).pipe(
      catchError(() => {
        return of(true);
      }),
      tap(() => this._products.update((products) => [product, ...products]))
    );
  }

  public update(product: Product): Observable<boolean> {
    return this.http.patch<boolean>(`${this.path}/${product.id}`, product).pipe(
      catchError(() => {
        return of(true);
      }),
      tap(() =>
        this._products.update((products) => {
          return products.map((p) => (p.id === product.id ? product : p));
        })
      )
    );
  }

  public delete(productId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.path}/${productId}`).pipe(
      catchError(() => {
        return of(true);
      }),
      tap(() =>
        this._products.update((products) =>
          products.filter((product) => product.id !== productId)
        )
      )
    );
  }
}
