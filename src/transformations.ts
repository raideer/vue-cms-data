export function localizeLinks(el: HTMLElement, $vm: any): void {
  el.querySelectorAll('a').forEach(child => {
    child.addEventListener('click', $event => {
      let target = $event.target as HTMLAnchorElement;
      while (target && target.tagName !== 'A') target = target.parentNode as HTMLAnchorElement;
      const { altKey, ctrlKey, metaKey, shiftKey, button, defaultPrevented } = $event;
      // don't handle with control keys
      if (metaKey || altKey || ctrlKey || shiftKey) return;
      // don't handle when preventDefault called
      if (defaultPrevented) return;
      // don't handle right clicks
      if (button !== undefined && button !== 0) return;
      // don't handle same page links/anchors
      const url = new URL((target as any).href);
      const to = url.pathname;
      // don't handle target attribute
      if (target.getAttribute('target')) return;
      if (window.location.pathname !== to && target.href.includes(window.location.host) && $event.preventDefault) {
        $event.preventDefault();
        $vm.$router.push(to);
      }
    });
  });
}

export function lazyloadImages(el: HTMLElement, vnode: any): void {
  el.querySelectorAll('img').forEach(child => {
    let value: string | null;
    if (child.getAttribute('data-src')) {
      value = child.getAttribute('data-src');
    } else {
      value = child.getAttribute('src');
    }
    vnode.context.$Lazyload.add(
      child,
      {
        value,
        modifiers: {},
      },
      vnode,
    );
    child.removeAttribute('src');
  });
}
