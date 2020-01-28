# Vue Cms Data
Adds a directive for localizing links and lazyloading images for raw html data. Created for [vue-storefront](https://github.com/DivanteLtd/vue-storefront) but theoretically could be used elsewhere.


## Installation
* Download this repo and place it in `src/modules/vue-cms-data`
* Or install it directly with yarn

## Usage
Instead of using `v-html` directive, just use `v-cms-data`
```vue
<template>
    <div class="container">
      <div v-cms-data="staticHtmlContent" />
    </div>
  </template>
  
  <script>
  import CmsData from 'src/modules/vue-cms-data/directives/CmsData'
  
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
