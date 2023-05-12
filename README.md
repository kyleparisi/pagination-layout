# Pagination Layout

In keeping with the idea that data should represent your layout, this simple library will help you calculate your pagination navigation view.

![demo](https://s3.amazonaws.com/cdn.kyleparisi.com/pagination-calculation.gif)

![network](/network.png)

## Usage

[![npm version](https://badge.fury.io/js/pagination-layout.svg)](https://badge.fury.io/js/pagination-layout)

or

```html
<script src="https://unpkg.com/pagination-layout@1.0.5/pagination-layout.js"></script>
<!-- prod -->
<script src="https://unpkg.com/pagination-layout@1.0.5/pagination-layout.min.js"></script>
```

```javascript
const pages = [ [], [], [], [], [] ];
paginationLayout(pages);
// => [1, 2, 3, 4, 5]

const pages = [ [], [], [], [], [], [], [], [] ];
const currentPage = 4;
paginationLayout(pages, currentPage);
// => [1, "...", 3, 4, 5, "...", 8]
```

Or if you are using the `-be` version:

```javascript
const totalItems = 500
const itemsPerPage = 100
paginationLayout(totalItems, itemsPerPage);
// => [1, 2, 3, 4, 5]

const totalItems = 800;
const itemsPerPage = 100;
const currentPage = 4;
paginationLayout(totalItems, itemsPerPage, currentPage);
// => [1, "...", 3, 4, 5, "...", 8]
```

## Build

```bash
uglifyjs pagination-layout.js > pagination-layout.min.js
uglifyjs pagination-layout-be.js > pagination-layout-be.min.js
```

## Publish

```bash
# change package.json version then:
npm publish
```
