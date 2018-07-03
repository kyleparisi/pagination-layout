# Pagination Layout

In keeping with the idea that data should represent your layout, this simple library will help you calculate your pagination navigation view.

![demo](http://cdn.kyleparisi.com.s3-website-us-east-1.amazonaws.com/2018-07-02%2014_19_22.gif)

## Usage

[![npm version](https://badge.fury.io/js/pagination-layout.svg)](https://badge.fury.io/js/pagination-layout)

or

```html
<script src="https://unpkg.com/pagination-layout@1.0.1/pagination-layout.js"></script>
<!-- prod -->
<script src="https://unpkg.com/pagination-layout@1.0.1/pagination-layout.min.js"></script>
```

```javascript
const pages = [ [], [], [], [], [] ];
paginationLayout(pages);
// => [1, 2, 3, "...", 5]

const pages = [ [], [], [], [], [], [], [] ];
const currentPage = 5;
paginationLayout(pages, currentPage);
// => [1, "...", 5, 6, 7]
```
