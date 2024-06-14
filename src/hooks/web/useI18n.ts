import { i18n } from '@/locales/setupI18n'

export const useI18n = () => {
  const { t } = i18n.global

  return {
    t
  }
}
