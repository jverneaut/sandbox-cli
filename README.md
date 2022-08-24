# Sandbox cli

This is an opinionated static site generator built with speed of development in mind.

This is very cutting edge software and should not be used in production yet as the API is subject to change in the near future.

## Install

1. Get the library

```sh
npm install @jverneaut/sandbox
```

2. Add a `pages` folder with at least a `index.md`, `index.js` and `index.twig` files in this directory

```sh
mkdir pages
touch index.md index.twig index.js
```

3. Add a frontmatter to the `index.md` file to specify its title

```md
---
title: Example
---
```

4. Add a `dev` and `build` script to your project

```json
 "scripts": {
    "dev": "sandbox dev",
    "build": "sandbox build"
  },
```
