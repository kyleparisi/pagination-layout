# Pagination Layout

In keeping with the idea that data should represent your layout, this simple library will help you calculate your pagination navigation view.

![demo](http://cdn.kyleparisi.com.s3-website-us-east-1.amazonaws.com/2018-07-02%2014_19_22.gif)

## Usage

[![npm version](https://badge.fury.io/js/pagination-layout.svg)](https://badge.fury.io/js/pagination-layout)

or

```html
<script src="https://unpkg.com/pagination-layout@1.0.4/pagination-layout.js"></script>
<!-- prod -->
<script src="https://unpkg.com/pagination-layout@1.0.4/pagination-layout.min.js"></script>
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
