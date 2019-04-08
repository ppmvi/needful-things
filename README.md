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

There is also an executable `ppmvi` to run tasks like generating favicons. If you wanna know whats possible, run the following command.

```bash
yarn ppmvi --help
```

## Configuration

In order for something like generating favicons to work, you need to create a file `.ppmvi.js` inside your root directory. This file should export an object. This object can hold one of the following attributes.

| Attribute | Type | Default | Description |
|-----------|--------|---------|-------------|
| favicons | object | {} | The configuration for the realfavicongenerator api. https://realfavicongenerator.net/api/non_interactive_api |

## Components

### EmailLink

This component provides a simple way to include an `a`-tag with a `mailto` link.

#### Usage

```js
EmailLink: () => import('@ppm-vi/needful-things').then(({ EmailLink }) => EmailLink)
```

#### Props

- `email` ***String***  
The actual email which should be used for the `mailto` link.

---

### TelLink

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


## Meta Tags / Rel Links  Helpers

All helpers return arrays or object, prepared for usage with `vue-meta`.

### applyFacebookMetaTags

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


### applyTwitterMetaTags

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

### applySplashscreenLinks

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