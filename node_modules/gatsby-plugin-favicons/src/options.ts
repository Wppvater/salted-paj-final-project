import { array, boolean, object, optional, string, StructType } from 'superstruct';

export const OptionsStruct = object({
  logo: string(),
  appName: optional(string()),
  background: optional(string()),
  icons: optional(
    object({
      android: optional(boolean()),
      appleIcon: optional(boolean()),
      appleStartup: optional(boolean()),
      coast: optional(boolean()),
      favicons: optional(boolean()),
      yandex: optional(boolean()),
      windows: optional(boolean())
    })
  ),
  plugins: optional(array())
});

export type Options = StructType<typeof OptionsStruct>;
