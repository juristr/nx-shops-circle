import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { select, Store } from '@ngrx/store';
import { concatMap, map } from 'rxjs/operators';

import {
  getProduct,
  getProductsState,
  ProductsPartialState,
} from '@nx-shops/shared/product/state';
import '@nx-shops/shared/product/ui';

@Component({
  selector: 'nx-shops-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.scss'],
})
export class ProductDetailPageComponent {
  product = this.route.paramMap.pipe(
    map((paramMap) => paramMap.get('productId')),
    concatMap((productId) =>
      this.store.pipe(select(getProductsState), select(getProduct, productId))
    )
  );
  constructor(
    private store: Store<ProductsPartialState>,
    private route: ActivatedRoute
  ) {}
}
