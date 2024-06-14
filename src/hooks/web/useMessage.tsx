import {
  ElMessage,
  ElMessageBox,
  type ElMessageBoxOptions,
  type MessageOptions
} from 'element-plus'
import { isString } from 'lodash-es'
import 'element-plus/theme-chalk/src/message.scss'
import 'element-plus/theme-chalk/src/message-box.scss'
import { useI18n } from './useI18n'

function renderContent({ message }: Pick<ElMessageBoxOptions, 'message'>) {
  if (isString(message)) {
    return <div innerHTML={`<div>${message as string}</div>`}></div>
  } else {
    return message
  }
}

function getDefaultOptions(): ElMessageBoxOptions {
  const { t } = useI18n()
  return {
    icon: '',
    confirmButtonText: t('common.Confirm'),
    cancelButtonText: t('common.Cancel'),
    center: true
  }
}

function createConfirm(options: ElMessageBoxOptions) {
  const opt = {
    ...getDefaultOptions(),
    ...options,
    message: renderContent(options)
  } as ElMessageBoxOptions
  return ElMessageBox.confirm(renderContent(options), opt)
}
function createAlert(options: ElMessageBoxOptions) {
  const opt = {
    ...getDefaultOptions(),
    ...options,
    message: renderContent(options)
  } as ElMessageBoxOptions
  return ElMessageBox.alert(renderContent(options), opt)
}
function createSuccess(options: MessageOptions) {
  return ElMessageBox(options)
}

function createError(options: ElMessageBoxOptions) {
  return ElMessage.error(options)
}

function createInfo(options: ElMessageBoxOptions) {
  return ElMessage.info(options)
}

function createWarning(options: ElMessageBoxOptions) {
  return ElMessage.warning(options)
}

/**
 * @description: message
 */
export function useMessage() {
  return {
    ElMessageBox: ElMessageBox,
    ElMessage: ElMessage,
    createConfirm,
    createAlert,
    createSuccess,
    createError,
    createInfo,
    createWarning
  }
}
