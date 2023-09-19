import { NgModule } from '@angular/core';
import { ShoppingListService } from './shopping/shopping-list/shopping-list.service';
import { RecipeService } from './shopping/recipes/recipe.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './shopping/auth/auth-interceptor.service';
import { LoggingService2 } from './logging.service';

@NgModule({
  providers: [
    ShoppingListService,
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    // LoggingService2,
  ],
})
export class CoreModule {}
