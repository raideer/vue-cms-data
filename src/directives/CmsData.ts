import { applyTransformations } from '../cms-data';

export default {
  bind(el: HTMLElement, binding: any, vnode: any) {
    let localized: boolean;
    let lazy: boolean;
    let content: string;

    if (binding.value && typeof binding.value === 'object') {
      localized = !!binding.value.localized;
      lazy = !!binding.value.lazy;
      content = binding.value.content;
    } else {
      localized = binding.modifiers.localized;
      lazy = binding.modifiers.lazy;
      content = binding.value;
    }

    el.innerHTML = '';

    applyTransformations(content, vnode.context, {
      localized,
      lazy,
    }).forEach(child => el.appendChild(child));
  },
};
