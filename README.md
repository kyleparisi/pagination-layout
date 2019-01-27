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

## Build

```bash
uglifyjs pagination-layout.js > pagination-layout.min.js
```

## Publish

```bash
npm publish
```
