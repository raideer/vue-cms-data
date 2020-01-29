import { localizeLinks, lazyloadImages } from './transformations';

export function applyTransformations(
  html: string,
  $vm: any,
  settings = {
    localized: true,
    lazy: true,
  },
): ChildNode[] {
  const parser = new DOMParser();
  const { body } = parser.parseFromString(html, 'text/html');

  // Link localization
  if (settings.localized) {
    localizeLinks(body, $vm);
  }

  // Image lazyloading
  if (settings.lazy && $vm.$Lazyload) {
    lazyloadImages(body, {
      context: $vm,
    });
  }

  return (Array as any).from(body.childNodes);
}
