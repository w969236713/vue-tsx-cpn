<script lang="tsx">
import { computed, defineComponent, type PropType, ref, unref, useAttrs } from 'vue'
import { SelectProps } from 'element-plus/es/components/select/src/select'
import { propTypes } from '@/utils/propTypes'
import { get, isFunction, omit } from 'lodash-es'

type OptionsItem = { label?: string; value?: string; disabled?: boolean; [name: string]: any }

const apiSelectProps = {
  ...SelectProps,
  modelValue: propTypes.any.def([] || ''),
  numberToString: propTypes.bool,
  api: {
    type: Function as PropType<(arg?: any) => Promise<OptionsItem[] | Recordable<any>>>,
    default: null
  },
  params: propTypes.any.def({}),
  remoteField: propTypes.string.def('text'),
  resultField: propTypes.string.def(''),
  labelField: propTypes.string.def('label'),
  valueField: propTypes.string.def('value'),
  immediate: propTypes.bool.def(true),
  alwaysLoad: propTypes.bool.def(false),
  options: {
    type: Array<OptionsItem>,
    default: []
  },
  beforeFetch: {
    type: Function as PropType<Fn>,
    default: null
  },
  afterFetch: {
    type: Function as PropType<Fn>,
    default: null
  }
}
export default defineComponent({
  name: 'ApiSelect',
  props: apiSelectProps,
  inheritAttrs: false,
  emits: ['update:modelValue', 'update:options'],
  setup(props, { slots, expose, emit }) {
    const attrs = useAttrs()
    const selectRef = ref()
    const loading = ref(false)
    const isFirstLoaded = ref(false)

    const options = ref<OptionsItem[]>(props.options)

    const selectValue = computed({
      get: () => props.modelValue,
      set: (val) => {
        emit('update:modelValue', val)
      }
    })

    const getOptions = computed(() => {
      const { labelField, valueField, numberToString } = props
      let data = unref(options).reduce((prev, next: any) => {
        if (next) {
          const value = get(next, valueField)
          prev.push({
            ...omit(next, [labelField, valueField]),
            label: get(next, labelField),
            value: numberToString ? `${value}` : value
          })
        }
        return prev
      }, [] as OptionsItem[])

      const _options = data.length > 0 ? data : props.options

      emit('update:options', _options)

      return _options
    })

    async function fetch(query?: string) {
      let { api, beforeFetch, afterFetch, params, resultField } = props

      if (!api || !isFunction(api) || loading.value) return

      try {
        loading.value = true

        if (beforeFetch && isFunction(beforeFetch)) {
          params = (await beforeFetch(params)) || params
        }

        if (props.remote) {
          if (query) {
            params = { ...params, [props.remoteField]: query }
          }

          if (!query && isFirstLoaded.value) {
            return
          }
        }

        let res = await api(params)
        if (afterFetch && isFunction(afterFetch)) {
          res = (await afterFetch(res)) || res
        }
        isFirstLoaded.value = true
        if (Array.isArray(res)) {
          options.value = res
          return
        }
        if (resultField) {
          options.value = get(res, resultField) || []
        }
      } catch (error) {
        isFirstLoaded.value = false
      } finally {
        loading.value = false
      }
    }

    props.immediate && fetch()

    const _expose = new Proxy(
      {
        fetch
      },
      {
        get: (t, k) => Reflect.get(t, k) ?? Reflect.get(selectRef.value || {}, k),
        has: (t, k) => Reflect.has(t, k) || Reflect.has(selectRef.value || {}, k)
      }
    )

    expose(_expose)

    return () => {
      return (
        <el-select {...props} {...unref(attrs)} v-model={selectValue.value} ref={selectRef} remote-method={(t: string) => fetch(t)}>
          {{
            default: () => getOptions.value?.map((i) => <el-option key={i.value} label={i.label} value={i.value} />),
            ...slots
          }}
        </el-select>
      )
    }
  }
})
</script>
