# Needful things for Vue.js web projects

<p align="left">
    <a href="https://www.npmjs.com/package/@ppm-vi/needful-things"><img src="https://badgen.net/npm/v/@ppm-vi/needful-things" alt="Version"></a>
</p>

> Be aware that this package is tailored to our needs.

## Installation

```bash
yarn add @ppm-vi/needful-things
```

## Components

### EmailLink

This component provides a simple way to include an `a`-tag with a `mailto` link.

#### Install

```js
EmailLink: () => import('@ppm-vi/needful-things').then(({ EmailLink }) => EmailLink)
```

#### Props

- `email` ***String***  
The actual email which should be used for the `mailto` link.

---

### TelLink

This component provides a simple way to include an `a`-tag with a `tel` link. Whitespaces, `/` and `-` are automatically removed.

#### Install

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
