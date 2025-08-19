import { InjectionToken } from "@angular/core";

export const ATLAS_SHELL_TOKEN = new InjectionToken<string>("AtlasShellToken")
export const ATLAS_SHELL_ENTITY_ID_TOKEN = new InjectionToken<string>("AtlasShellEntityIDToken")
export const ATLAS_SHELL_ENTITY_FEATURE_TOKEN = new InjectionToken<string>("AtlasShellEntityFeatureToken")
export const ATLAS_SHELL_ENTITY_REDUCER_TOKEN = new InjectionToken<any>("AtlasShellEntityReducer")
export const ATLAS_SHELL_ROOT_TOKENS = new InjectionToken<string[]>("ATLAS_SHELL_ROOT_TOKENS")