import MgntAlert from 'component/mgnt-alert/src/MgntAlert.vue'
import Button from "component/button/src/Button.vue"

export const defaultRenderFn = (args: any) => ({
  components: { MgntAlert, Button },
  setup() {
    return {args}
  },
  template: `
    <div style="max-width: 300px">
    <mgnt-alert v-bind="args">
        <template v-slot:button1>
            <Button
                btnType="default"
                style="marginRight: 24px; margin-top: 20px;"
            >Submit
            </Button>
        </template>
        <template v-slot:button2>
            <Button
                btnType="text"
            >Submit
            </Button style="margin-top: 20px;">
        </template>
    </mgnt-alert>
    </div>
  `,
})