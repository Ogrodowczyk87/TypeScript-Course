import { type FeatureFlags } from './legacy-flags.ts';

type FlagsV2<T> = {
  [K in keyof T as K extends `${string}V2` ? K : never]: T[K]; 
}

export type ModernFeatureFlags = FlagsV2<FeatureFlags>;

export function getFeatureFlagsV2(flags: FeatureFlags): ModernFeatureFlags {
  const flagsV2 = {
    isSearchEnabled: false,
    isContactFormEnabled: true,
    isCartEnabled: true,
  } as ModernFeatureFlags;

  for (const key in flags) {
    if (key.endsWith('V2')) {
      const modernKey = key.substring(0, key.length - 2);
      (flagsV2 as any)[modernKey] = flags[key as keyof FeatureFlags];
    }
  }

  return flagsV2;
}
