<template>
    <div ref="wrapper" :style="wrapperStyle" @keyup="keypressCallBack" @click="shadeClick($event)">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import screenfull from 'screenfull'
import {CSSProperties, ref,computed,watch, reactive} from 'vue';
const wrapper = ref();
// teleport当前元素是否全屏  false内容全屏   true全部全屏
const props = withDefaults(
    defineProps<{
        modelValue:boolean
        fullScreen:boolean
        pageOnly:boolean
        exitOnClickWrapper:boolean
        teleport:boolean
    }>(),{
        modelValue:false,
        fullScreen:false,
        pageOnly:false,
        exitOnClickWrapper:false,
        teleport:true
        }
)
const state = reactive({
    isFullscreen:false
})
//如果为true,仅当前元素填充页面，浏览器不支持全屏api，该选项仍然开启
const isPageOnly = computed(()=>{
    return props.pageOnly || !screenfull.isEnabled
})

//如果浏览器不支持，则使用定位实现全屏
const wrapperStyle = computed(()=>{
    return isPageOnly.value  && props.modelValue ? ({
        position:"fixed",
        left:"0",
        top:"0",
        with:"100%",
        height:"100%",
    } as CSSProperties) :undefined
})
const shadeClick = (e:any)=>{
    //点击了wrapper盒子，并且允许点击关闭时，可以关闭
    if(e.target === wrapper.value && props.exitOnClickWrapper){
        exit();
    }
}

watch(()=>props.modelValue,(value)=>{
    if(value !== state.isFullscreen){
        value ? request() : exit()
    }
})

const request = ()=>{
    console.log(wrapper);
    if(!isPageOnly.value){
        screenfull.request(props.teleport ? document.body : wrapper.value.children[0])
        state.isFullscreen = true;
    }else{
        state.isFullscreen = true;
        document.addEventListener('keyup',keypressCallBack)
    }
    console.log(state.isFullscreen);
    emit('change',state.isFullscreen);
}

function exit(){
    console.log('退出时',state.isFullscreen);
    if(state.isFullscreen){
        if(isPageOnly.value){
            state.isFullscreen = false;
            document.removeEventListener('keyup',keypressCallBack)
        }else{
            screenfull.exit();
            state.isFullscreen = false;
            emit('change',state.isFullscreen)
        }
    }
    emit('change',screenfull.isFullscreen);
}

function keypressCallBack(e:KeyboardEvent){
    if(e.key === 'Escape'){
        exit()
    }
}

const emit = defineEmits(['change'])
</script>