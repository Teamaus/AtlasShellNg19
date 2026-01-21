import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule, StoreFeatureModule } from '@ngrx/store';

import {
  ATLAS_SHELL_ENTITY_FEATURE_TOKEN,
  ATLAS_SHELL_ENTITY_REDUCER_TOKEN,
  ShellReducerAdapter,
  shellRedcersMapAdapter
} from 'atlas-shell-logic';
import { AtlasShellEntityService } from '../atlas-shell-entity.service';
import { AtlasShellModalModuleModule } from '../atlas-shell-modal-module/atlas-shell-modal-module.module';

import { AtlasShellUIModule } from '../atlas-shell-ui.module';
import { AtlasShellEntityDirective } from '../atlas-shell-entity.directive';
import { AtlasShellRootDirective } from '../atlas-shell-root.directive';

@NgModule({
  declarations:[AtlasShellEntityDirective,AtlasShellRootDirective],
  imports: [CommonModule],
  exports:[AtlasShellEntityDirective,AtlasShellRootDirective]
  
})
export class ShellEntityModule {
  /** Normalizes reducers: accepts a reducer or a reducer-map and adapts them per entity token */
  private static getReducers(reducers: any) {
    return (entityToken: string) => {
      if (reducers && typeof reducers === 'object') {
        return shellRedcersMapAdapter(entityToken, reducers);
      }
      return ShellReducerAdapter(reducers, entityToken);
    };
  }

  /** Register a feature store with extra providers (feature name & raw reducers) */
  static feature(featureName: string, reducers: any): ModuleWithProviders<StoreFeatureModule> {
    const adapted = ShellEntityModule.getReducers(reducers)(featureName);
    const feature = StoreModule.forFeature(featureName, adapted);

    const extraProviders: Provider[] = [
      { provide: ATLAS_SHELL_ENTITY_FEATURE_TOKEN, useValue: featureName },
      AtlasShellEntityService,
      { provide: ATLAS_SHELL_ENTITY_REDUCER_TOKEN, useValue: reducers },
    ];

    // Return a fresh ModuleWithProviders; do NOT mutate feature.providers
    return {
      ngModule: feature.ngModule,
      providers: [ ...(feature.providers ?? []), ...extraProviders ],
    };
  }

  /** Optional: register a modal feature alongside */
  static modalFeature(modalName: string, component: any): ModuleWithProviders<AtlasShellModalModuleModule> {
    // if AtlasShellModalModuleModule.feature(...) does internal setup, keep the call:
    AtlasShellModalModuleModule.feature(modalName, component);
    return { ngModule: AtlasShellModalModuleModule };
  }

  /** Root registration for shared services/tokens */
  static root(): ModuleWithProviders<ShellEntityModule> {
    return {
      ngModule: ShellEntityModule,
      providers: [
        { provide: ATLAS_SHELL_ENTITY_FEATURE_TOKEN, useValue: 'root' },
        AtlasShellEntityService,
      ],
    };
  }
}
