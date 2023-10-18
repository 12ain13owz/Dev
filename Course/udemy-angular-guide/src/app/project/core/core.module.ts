import { NgModule } from '@angular/core';

import { RecipeService } from '../recipes/recipe.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { AuthService } from '../auth/auth.service';
import { AuthInterceptorProviders } from '../auth/auth.interceptor';
import { LoggingService } from '../logging.service';

@NgModule({
  providers: [
    RecipeService,
    ShoppingListService,
    AuthService,
    AuthInterceptorProviders,
    LoggingService,
  ],
})
export class CoreModule {}
