# Vue Cms Data
Adds a directive for localizing links and lazyloading images for raw html data. Created for [vue-storefront](https://github.com/DivanteLtd/vue-storefront) but theoretically could be used elsewhere.


## Installation
* Add this package to your project with `yarn add vue-cms-data` or `npm i vue-cms-data`

## Usage
Instead of using `v-html` directive, just use `v-cms-data`
```vue
<template>
    <div class="container">
      <div v-cms-data="staticHtmlContent" />
    </div>
  </template>

  <script>
  import CmsData from 'vue-cms-data'

  export default {
    directives: {
      CmsData
    },
    computed: {
      staticHtmlContent () {
        // Returns static html
      }
    }
  }
  </script>
```

By default the static data won't be localized or lazy loaded. To do that, you have pass modifiers to the
directive:

```vue
<div v-cms-data.localized="staticHtmlContent" />
<div v-cms-data.lazy="staticHtmlContent" />
<div v-cms-data.localized.lazy="staticHtmlContent" />
```

Instead of passing modifiers, you can also pass an object to the directive and specify them there:

```vue
<div v-cms-data.localized="{
  content: staticHtmlContent,
  localized: true,
  lazy: true
}" />
```

If you have a case where you can't use a directive, you can apply these transformations dirrectly to an html string and receive
an array of HTML Elements:

```vue
<script>
import { applyTransformations } from 'vue-cms-data/lib/cms-data'

export default {
  computed: {
    transformHtml () {
      /**
       * content: string
       * $vm: Vue,
       * settings?: Object
       **/
      return applyTransformations(this.html, this, {
        localize: true,
        lazy: true
      }).forEach(child => {
        document.body.appendChild(child)
      })
    }
  }
}
</script>
```
