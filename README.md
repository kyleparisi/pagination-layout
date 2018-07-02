# Pagination Layout

In keeping with the idea that data should represent your layout, this simple library will help you calculate your pagination navigation view.

## Usage

```javascript
const pages = [ [], [], [], [], [] ];
paginationLayout(pages);
// => [1, 2, 3, "...", 5]

const pages = [ [], [], [], [], [], [], [] ];
const currentPage = 5;
paginationLayout(pages, currentPage);
// => [1, "...", 5, 6, 7]
```
