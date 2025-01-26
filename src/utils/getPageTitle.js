const title = process.env.VUE_APP_BASE_NAME || '智慧消防';

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle}-${title}`;
  }
  return title;
}
