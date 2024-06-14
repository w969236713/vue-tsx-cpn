import type { App } from 'vue'
import type { I18nOptions } from 'vue-i18n'
import { createI18n } from 'vue-i18n'

async function createI18nOptions(): Promise<I18nOptions> {
  return {
    legacy: false,
    sync: true, //If you don’t want to inherit locale from global scope, you need to set sync of i18n component option to false.
    silentTranslationWarn: true, // true - warning off
    missingWarn: false,
    silentFallbackWarn: true
  }
}

const options = await createI18nOptions()

export const i18n: ReturnType<typeof createI18n> = createI18n(options)

export async function setupI18n(app: App) {
  app.use(i18n)
}
