# gatsby-plugin-favicons

Generate favicons (Android, iOS, etc.) for your Gatsby website.

Based on [`gatsby-plugin-favicon` by Creatiwity](https://github.com/Creatiwity/gatsby-plugin-favicon), but updated to work with Gatsby v2.

## Getting Started

```
yarn add --dev gatsby-plugin-favicons
```

### Usage

All options except `logo` are optional.

```js
// gatsby-config.js
plugins: [
  {
    resolve: 'gatsby-plugin-favicons',
    options: {
      logo: './src/logo.svg',
      appName: 'My Website',
      background: '#fff',
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        yandex: false,
        windows: false
      }
    }
  }
]
```
