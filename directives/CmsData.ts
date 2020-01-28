function localizeLinks (el, $vm) {
  el.querySelectorAll('a').forEach(child => {
    child.addEventListener('click', $event => {
      let target: any = $event.target
      while (target && target.tagName !== 'A') target = target.parentNode
      const { altKey, ctrlKey, metaKey, shiftKey, button, defaultPrevented } = $event
      // don't handle with control keys
      if (metaKey || altKey || ctrlKey || shiftKey) return
      // don't handle when preventDefault called
      if (defaultPrevented) return
      // don't handle right clicks
      if (button !== undefined && button !== 0) return
      // don't handle same page links/anchors
      const url = new URL((target as any).href)
      const to = url.pathname
      if (window.location.pathname !== to && $event.preventDefault) {
        $event.preventDefault()
        $vm.$router.push(to)
      }
    })
  })
}

export default {
  bind (el: HTMLElement, binding, vnode) {
    let localized: boolean
    let lazy: boolean
    let content: string

    if (binding.value && typeof binding.value === 'object') {
      localized = !!binding.value.localized
      lazy = !!binding.value.lazy
      content = binding.value.content
    } else {
      localized = binding.modifiers.localized
      lazy = binding.modifiers.lazy
      content = binding.value
    }

    const parser = new DOMParser()
    const { body } = parser.parseFromString(content, 'text/html')

    // Link localization
    if (localized) {
      localizeLinks(body, vnode.context)
    }

    // Image lazyloading
    if (lazy && vnode.context.$Lazyload) {
      body.querySelectorAll('img').forEach(child => {
        const childBinding = Object.assign({}, binding, {
          value: child.getAttribute('src')
        })
        child.removeAttribute('src')
        vnode.context.$Lazyload.add(child, childBinding, vnode)
      })
    }

    el.innerHTML = ''
    Array.from(body.childNodes).forEach(child => el.appendChild(child))
  }
}
