import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Jh Vue Admin'

export default function getPageTitle(pageTitle) {
  // if (pageTitle) {
  //   return `${pageTitle} - ${title}`
  // }
  return `${title}`
}
