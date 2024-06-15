<script lang="tsx">
import { defineComponent } from 'vue'
import { formItemProps } from 'element-plus'

export default defineComponent({
  name: 'SchemaFormItem',
  props: { ...formItemProps },
  setup(props, { slots }) {
    return () => {
      return (
        <>
          <el-form-item {...props}>
            {{
              ...slots
            }}
          </el-form-item>
        </>
      )
    }
  }
})
</script>
