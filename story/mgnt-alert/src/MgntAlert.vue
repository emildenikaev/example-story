<template >
    <div 
        v-if="isAlert"
        :class="[
            classes['alert'],
            classes[type],
            classes[size],
        ]">
        <div :class="classes['alert-wrapper']">
            <span
                v-if="statusIcon"
                :class="[
                    props.size === 'medium' && classes['alert-medium'],
                    props.size === 'large' && classes['alert-large']
                ]"
            >
                <statusIcon />
            </span>
            <div :class="classes['alert-text']">
                <span 
                    v-if="props.title && props.size === 'large'" 
                    :class="classes['alert-title']"
                > 
                    {{ title }}
                </span>
                <span> {{ bodyText }}</span>
                <div v-if="isButton">
                    <slot name="button1" />
                    <slot name="button2" />
                </div>
            </div>
        </div>
        <div 
            v-if="isClose" 
            @click="handleClose"
            :class="classes['alert-close']"
        >
            <IconClose />
        </div>
    </div>
</template>
<script
    lang='ts'
    setup
>
// TODO: Сменить Button на новый.
import IconSuccess from "./icons/IconSuccess.vue"
import IconInfo from "./icons/IconInfo.vue"
import IconWarning from "./icons/IconWarning.vue"
import IconNeutral from "./icons/IconNeutral.vue"
import IconClose from "./icons/IconClose.vue"
import IconError from "./icons/IconError.vue"
import {computed, onMounted, ref} from "vue"

enum AlertType {
  isInfo = 'is-info',
  isWarning = 'is-warning',
  isError = 'is-error',
  isSuccess = 'is-success',
  isNeutral = 'is-neutral',
}

enum AlertSize {
  medium = 'medium',
  large = 'large'
}

interface Props {
    // Тип кнопка (цвет)
    type: AlertType,
    // Заголовок
    title: string,
    // Основной текст
    bodyText: string,
    // Размер 
    size: AlertSize,
    // Время автозакрытия
    timeClosing: number
    // Кнопки
    isButton: boolean
    // Значок закрытия
    isClose: boolean
}

const props = defineProps<Props>()

const isAlert = ref<boolean>(true)

const timeClosing = ref<number>(props.timeClosing)

const statusIcon = computed(() => {
  switch (props.type) {
    case "is-success":
      return IconSuccess
    case "is-info":
      return IconInfo
    case "is-warning":
      return IconWarning
    case "is-error":
      return IconError
    case "is-neutral":
      return IconNeutral
    default:
      return ""
  }
})

const handleClose = () => {
    isAlert.value = false
}

onMounted(() => {
    if (timeClosing.value > 0) {
        setTimeout(() => {
            isAlert.value = false
        }, timeClosing.value)
    }
})
</script>
<style
    lang="scss"
    module="classes"
>
    .alert {
        padding: 16px;
        border-radius: 8px;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #222529;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        

        &-text {
            display: flex;
            flex-direction: column;
        }

        &-title {
            font-weight: 600;
            font-size: 16px;
            line-height: 24px;
        }

        &-medium {
            display: flex;
            margin-right: 12px;
        }

        &-large {
            display: flex;
            margin-right: 16px;  
        }

        &-close {
            cursor: pointer;
        }

        &-wrapper {
            display: flex;
        }
    }

    .large {
        padding: 24px;
        display: flex;
        align-items: flex-start;       
    }
    
    .is-info { 
        background: #F0F6FF;
        border: 1px solid #0066FF;
    }

    .is-warning {
        background: #FFF8F1;
        border: 1px solid #FF621F;
    }

    .is-error {
        background: #FDF2F2;
        border: 1px solid #E02424;
    }

    .is-success { 
        background: #F3FAF7;
        border: 1px solid #0E9F6E;
    }
    
    .is-neutral {
        background: #FAFAFA;
        border: 1px solid #CFD4D9;
    }
</style>