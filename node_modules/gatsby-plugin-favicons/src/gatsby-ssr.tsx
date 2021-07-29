import { RenderBodyArgs } from 'gatsby';
import React from 'react';
import { assert } from 'superstruct';
import { Options, OptionsStruct } from './options';

export const onRenderBody = (
  { setHeadComponents, pathPrefix }: RenderBodyArgs,
  options: Options
): void => {
  // Options are validated in `gatsby-node`, so we can simply assert here
  assert(options, OptionsStruct);

  const prefix = (pathPrefix && (pathPrefix.endsWith('/') ? pathPrefix : `${pathPrefix}/`)) || '/';
  const {
    android = true,
    appleIcon = true,
    appleStartup = true,
    coast = false,
    favicons = true,
    yandex = false,
    windows = false
  } = options.icons ?? {};

  const components = [];

  if (android) {
    components.push(
      <link key="android-manifest" rel="manifest" href={`${prefix}favicons/manifest.json`} />
    );
  }

  if (appleIcon) {
    components.push(
      <link
        key="apple-touch-icon-57x57"
        rel="apple-touch-icon"
        sizes="57x57"
        href={`${prefix}favicons/apple-touch-icon-57x57.png`}
      />,
      <link
        key="apple-touch-icon-60x60"
        rel="apple-touch-icon"
        sizes="60x60"
        href={`${prefix}favicons/apple-touch-icon-60x60.png`}
      />,
      <link
        key="apple-touch-icon-72x72"
        rel="apple-touch-icon"
        sizes="72x72"
        href={`${prefix}favicons/apple-touch-icon-72x72.png`}
      />,
      <link
        key="apple-touch-icon-76x76"
        rel="apple-touch-icon"
        sizes="76x76"
        href={`${prefix}favicons/apple-touch-icon-76x76.png`}
      />,
      <link
        key="apple-touch-icon-114x114"
        rel="apple-touch-icon"
        sizes="114x114"
        href={`${prefix}favicons/apple-touch-icon-114x114.png`}
      />,
      <link
        key="apple-touch-icon-120x120"
        rel="apple-touch-icon"
        sizes="120x120"
        href={`${prefix}favicons/apple-touch-icon-120x120.png`}
      />,
      <link
        key="apple-touch-icon-144x144"
        rel="apple-touch-icon"
        sizes="144x144"
        href={`${prefix}favicons/apple-touch-icon-144x144.png`}
      />,
      <link
        key="apple-touch-icon-152x152"
        rel="apple-touch-icon"
        sizes="152x152"
        href={`${prefix}favicons/apple-touch-icon-152x152.png`}
      />,
      <link
        key="apple-touch-icon-180x180"
        rel="apple-touch-icon"
        sizes="180x180"
        href={`${prefix}favicons/apple-touch-icon-180x180.png`}
      />
    );
  }

  if (appleStartup) {
    components.push(
      <link
        key="apple-touch-startup-image-320x460"
        rel="apple-touch-startup-image"
        media="(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 1)"
        href={`${prefix}favicons/apple-touch-startup-image-320x460.png`}
      />,
      <link
        key="apple-touch-startup-image-460x920"
        rel="apple-touch-startup-image"
        media="(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2)"
        href={`${prefix}favicons/apple-touch-startup-image-640x920.png`}
      />,
      <link
        key="apple-touch-startup-image-640x1096"
        rel="apple-touch-startup-image"
        media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
        href={`${prefix}favicons/apple-touch-startup-image-640x1096.png`}
      />,
      <link
        key="apple-touch-startup-image-750x1294"
        rel="apple-touch-startup-image"
        media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
        href={`${prefix}favicons/apple-touch-startup-image-750x1294.png`}
      />,
      <link
        key="apple-touch-startup-image-1182x2208"
        rel="apple-touch-startup-image"
        media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
        href={`${prefix}favicons/apple-touch-startup-image-1182x2208.png`}
      />,
      <link
        key="apple-touch-startup-image-1242x2148"
        rel="apple-touch-startup-image"
        media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        href={`${prefix}favicons/apple-touch-startup-image-1242x2148.png`}
      />,
      <link
        key="apple-touch-startup-image-748x1024"
        rel="apple-touch-startup-image"
        media="(device-width: 748px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 1) and (orientation: landscape)"
        href={`${prefix}favicons/apple-touch-startup-image-748x1024.png`}
      />,
      <link
        key="apple-touch-startup-image-768x1004"
        rel="apple-touch-startup-image"
        media="(device-width: 768px) and (device-height: 1004px) and (-webkit-device-pixel-ratio: 1) and (orientation: portrait)"
        href={`${prefix}favicons/apple-touch-startup-image-768x1004.png`}
      />,
      <link
        key="apple-touch-startup-image-1496x2048"
        rel="apple-touch-startup-image"
        media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        href={`${prefix}favicons/apple-touch-startup-image-1496x2048.png`}
      />,
      <link
        key="apple-touch-startup-image-1536x2008"
        rel="apple-touch-startup-image"
        media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        href={`${prefix}favicons/apple-touch-startup-image-1536x2008.png`}
      />
    );
  }

  if (coast) {
    components.push(
      <link
        key="coast-228x228"
        rel="icon"
        sizes="228x228"
        href={`${prefix}favicons/coast-228x228.png`}
      />
    );
  }

  if (favicons) {
    components.push(
      <link
        key="favicon-32x32"
        rel="icon"
        sizes="32x32"
        href={`${prefix}favicons/favicon-32x32.png`}
      />,
      <link
        key="favicon-16x16"
        rel="icon"
        sizes="16x16"
        href={`${prefix}favicons/favicon-16x16.png`}
      />,
      <link key="favicon" rel="shortcut icon" href={`${prefix}favicons/favicon.ico`} />
    );
  }

  if (yandex) {
    components.push(
      <link
        key="yandex-browser-manifest"
        rel="yandex-tableau-widget"
        href={`${prefix}favicons/yandex-browser-manifest.json`}
      />
    );
  }

  if (windows) {
    components.push(
      <meta
        key="mstile-144x144"
        name="msapplication-TileImage"
        content={`${prefix}favicons/mstile-144x144.png`}
      />,
      <meta
        key="browserconfig"
        name="msapplication-config"
        content={`${prefix}favicons/browserconfig.xml`}
      />
    );
  }

  setHeadComponents(components);
};
