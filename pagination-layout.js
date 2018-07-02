(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD
    define([], factory);
  } else if (typeof exports === "object") {
    // CommonJS
    module.exports = factory();
  } else {
    // Browser globals (Note: root is window)
    root.paginationLayout = factory();
  }
})(this, function() {
  // Methods
  function paginationLayout(pages, currentPage) {
    function last(array) {
      const length = array == null ? 0 : array.length;
      return length ? array[length - 1] : undefined;
    }

    if (!pages || !pages.length) {
      return false;
    }

    // default pages when we only have <= 4 pages
    if ([1, 2, 3, 4].indexOf(pages.length) !== -1) {
      const defaultView = [];
      for (let i = 1; i <= pages.length; i++) {
        defaultView.push(i);
      }
      return defaultView;
    }

    currentPage = currentPage || 1;

    const boundary = 3;

    if (currentPage > pages.length) {
      console.warn(
        "Page selection out of bounds.  Picking array length as current page."
      );
      currentPage = pages.length;
    }

    if (currentPage < 1) {
      console.warn("Page selection out of bounds.  Picking page 1.");
      currentPage = 1;
    }

    const output = [];

    // count up to boundary amount from current page
    for (let i = currentPage; i <= pages.length; i++) {
      if (output.length === boundary) {
        break;
      }
      output.push(i);
    }

    // if we do not fill the boundary count, count down from current page
    if (output.length < boundary) {
      for (let i = currentPage - 1; i > pages.length - boundary; i--) {
        output.unshift(i);
      }
    }

    // attach last page to nav when only 1 away
    if (pages.length - last(output) === 1) {
      output.push(pages.length);
    }

    // put lowest page and ... when we exceed the boundary of 4
    if (
      pages.length === last(output) &&
      pages.length > boundary &&
      pages.length > 4
    ) {
      output.unshift(1, "...");
      return output;
    }

    // done if the final page is in view
    if (!(pages.length - last(output) > 1)) {
      return output;
    }

    // attach final page to view
    output.push("...");
    output.push(pages.length);

    return output;
  }

  return paginationLayout;
});
