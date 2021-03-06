# Needful things for Vue.js web projects

<p align="left">
    <a href="https://www.npmjs.com/package/@ppm-vi/needful-things"><img src="https://badgen.net/npm/v/@ppm-vi/needful-things" alt="Version"></a>
</p>

> Be aware that this package is tailored to our needs.

## Installation

```bash
yarn add @ppm-vi/needful-things
```

## Executable

There is also an executable `ppmvi` to run tasks like generating favicons. Execute the following command to use it:
```bash
yarn ppmvi --help
```

Currently there are two commands you can use

| Command | Arguments | Description |
|-----------|--------|---------|
| --generate-favicons | path to the folder | This command uses the realfavicongenerator api to generate favicons. |
| --tinify | none | This command uses the TinyPNG api to compress images. Because it is a bad thing to compress your images multiple times, we add a meta tag to every image which lets us identify if it has already been optimized. |

## Configuration

In order for something like generating favicons to work, you need to create a file `.ppmvi.js` inside your root directory. This file should export an object. This object can hold one of the following attributes.

| Attribute | Type | Default | Description |
|-----------|--------|---------|-------------|
| favicons | object | {} | The configuration for the realfavicongenerator api. https://realfavicongenerator.net/api/non_interactive_api |
| tinify | object | {} | Configuration for the tinify cli command |
| tinify > key | string | empty | The api key for TinyPNG |

# Components

## EmailLink

This component provides a simple way to include an `a`-tag with a `mailto` link.

#### Usage

```js
EmailLink: () => import('@ppm-vi/needful-things').then(({ EmailLink }) => EmailLink)
```

#### Props

- `email` ***String***  
The actual email which should be used for the `mailto` link.

## TelLink

This component provides a simple way to include an `a`-tag with a `tel` link. Whitespaces, `/` and `-` are automatically removed.

#### Usage

```js
TelLink: () => import('@ppm-vi/needful-things').then(({ TelLink }) => TelLink)
```

#### Props

- `tel` ***String***  
The actual telephone number which should be used for the `tel` link.

- `wrapper` ***Boolean***
Set to `true` if you dont want the component to render the telephone number into a `span`.

#### Slots

- `default` The default slot inside the a tag


# Meta Tags / Rel Links  Helpers

All helpers return arrays or object, prepared for usage with `vue-meta`.

## applyFacebookMetaTags

This method can be used to add the `og` meta tags.

#### Usage

```js
import { applyFacebookMetaTags } from '@ppm-vi/needful-things';

//...

meta: [
    // meta tags before
    ...applyFacebookMetaTags()
    // meta tags after
]

```

#### Params

- `meta` ***Object***  
The object with the configuration which accepts the following attributes:
```js
{
    type = '',
    title = '',
    description = '',
    image = '',
    siteName = ''
}
```


## applyTwitterMetaTags

This method can be used to add the `twitter` meta tags.

#### Usage

```js
import { applyTwitterMetaTags } from '@ppm-vi/needful-things';

//...

meta: [
    // meta tags before
    ...applyTwitterMetaTags()
    // meta tags after
]

```

#### Params

- `meta` ***Object***  
The object with the configuration which accepts the following attributes:
```js
{
    title = '',
    description = '',
    image = '',
    site = '',
    creator = ''
}
```

## applySplashscreenLinks

This method can be used to add meta tags for splashscreens.

#### Usage

```js
import { applySplashscreenLinks } from '@ppm-vi/needful-things';

//...

link: [
    // links before
    ...applySplashscreenMetaTags()
    // links after
]

```

#### Params

- `url` ***String***  `default: /static/splashscreens`  
The path where the splashscreens are located. 

- `additional` ***Array***
An array with objects for additional splashscreen links. The objects should have the following structure:
```js
    {
        width: Number,
        height: Number,
        ratio: Number,
        orientation: String,
        href: String
    }
```

## applyFaviconMetaTags

This method can be used to add all the meta tags necessary for favicons and pwa.

#### Usage

```js
import { applyFaviconMetaTags } from '@ppm-vi/needful-things';

//...

meta: [
    // links before
    ...applyFaviconMetaTags()
    // links after
]

```

#### Params

- `options` ***Object***
An objects with the configuration. The following options are available:
```js
{
    url = '/static/icons',
    manifest: {
        url = '/static',
        name = 'manifest.json'
    },
    color = '#FFFFFF'
}
```

## applyFaviconLinks

This method can be used to add all the links necessary for favicons and pwa.

#### Usage

```js
import { applyFaviconLinks } from '@ppm-vi/needful-things';

//...

link: [
    // links before
    ...applyFaviconLinks()
    // links after
]

```

#### Params

- `options` ***Object***
An objects with the configuration. The following options are available:
```js
{
    url = '/static/icons',
    color = '#FFFFFF',
    statusBarStyle = 'default'
}
```