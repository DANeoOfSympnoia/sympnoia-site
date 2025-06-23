# sympnoia-site
Website for Sympnoia: A shared ethical and philosophical journey.

## Philosophy Entries

Add new papers to the `_philosophy` directory. Each file only needs standard front matter with `layout: reader` followed by your markdown content. The reader layout automatically provides the styled container and options button, so do not include your own `<style>` or `<main>` wrappers.

Within the reader you can adjust the color scheme, font style, font size and width using the options
button in the top-right corner. Five accessible color presets (Olive is the default) and three width
choices are provided. Four font pairings and four font sizes are available. Defaults are applied so pages render correctly even when
JavaScript is disabled.


## Golden Height Scaling

This project extends Tailwind's height utilities with classes based on the
golden ratio. Any element can use classes of the form `h-gX_up_Y` or
`h-gX_down_Y` where `X` corresponds to the base Tailwind unit and `Y` is the
power of the golden ratio applied. For example, to size an image at `24` units
scaled down by one golden ratio step:

```html
<img src="..." class="h-g24_down_1 w-auto" alt="Menu">
```

These utilities are generated in `tailwind.config.js` using the
`goldenHeightExtensions` helper.
