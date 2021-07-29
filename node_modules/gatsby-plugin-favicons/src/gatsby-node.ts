import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import { CreateWebpackConfigArgs } from 'gatsby';
import { validate } from 'superstruct';
import { Options, OptionsStruct } from './options';

export const onCreateWebpackConfig = (
  { actions, reporter }: CreateWebpackConfigArgs,
  options: Options
): void => {
  const [error] = validate(options, OptionsStruct);
  if (error) {
    return reporter.panic(
      'gatsby-plugin-favicons: Invalid or missing options, please refer to the documentation',
      error
    );
  }

  const { logo, ...rest } = options;

  actions.setWebpackConfig({
    plugins: [
      new FaviconsWebpackPlugin({
        inject: false,
        prefix: 'favicons/',
        logo,
        favicons: {
          ...rest
        }
      })
    ]
  });
};
