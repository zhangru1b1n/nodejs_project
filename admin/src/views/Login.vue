<template>
    <div>
        <Particles id="tsparticles" :particlesInit="particlesInit" :options="{
            background: {
                color: {
                    value: '#2d3a4b'
                }
            },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: 'push'
                    },
                    onHover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    resize: true
                },
                modes: {
                    bubble: {
                        distance: 400,
                        duration: 2,
                        opacity: 0.8,
                        size: 40
                    },
                    push: {
                        quantity: 4
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    }
                }
            },
            particles: {
                color: {
                    value: '#ffffff'
                },
                links: {
                    color: '#ffffff',
                    distance: 150,
                    enable: true,
                    opacity: 0.5,
                    width: 1
                },
                collisions: {
                    enable: true
                },
                move: {
                    direction: 'none',
                    enable: true,
                    outModes: {
                        default: 'bounce'
                    },
                    random: false,
                    speed: 2,
                    straight: false
                },
                number: {
                    density: {
                        enable: true,
                        area: 800
                    },
                    value: 80
                },
                opacity: {
                    value: 0.5
                },
                shape: {
                    type: 'circle'
                },
                size: {
                    value: { min: 1, max: 5 },
                }
            },
            detectRetina: true
        }" />
        <div class="formContainer">
            <h3>门户管理系统</h3>
            <el-form ref="loginFormRef" :model="loginForm" status-icon :rules="rules" label-width="80px"
                class="demo-ruleForm">

                <el-form-item label="用户名" prop="username">
                    <el-input v-model.number="loginForm.username" />
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginForm.password" type="password" autocomplete="off" />
                </el-form-item>


                <el-form-item>
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import {useStore} from 'vuex'
import { loadFull } from "tsparticles";
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
// import 'element-plus/theme-chalk/index.css'
import axios from 'axios'
const router = useRouter()
const store = useStore()
const particlesInit = async engine => {
    await loadFull(engine);
};

const loginFormRef = ref()

//表单
const loginForm = reactive({
    username: '',
    password: '',
})
//验证
const rules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
})

const submitForm = () => {
    loginFormRef.value.validate((value) => {
        if (value) {
            console.log(loginForm.username, loginForm.password);
            //连接后端 验证密码

            axios.post('/adminapi/user/login', loginForm).then((res) => {
                if (res.data.ActionType == 'OK') {
                    store.commit('changeuserInfo',res.data.data)
                    // console.log(store.state.userInfo)
                    router.push('/')
                    store.commit('changeGetterRouter',false)
                    // localStorage.setItem('token', '455')
                }
                else {
                    ElMessage.error("用户名与密码不匹配")
                }
            })

        }
    })

}
</script>

<style scoped lang="scss">
.formContainer {
    width: 400px;
    height: 300px;
    background-color: rgba(#000000, 0.5);
    position: fixed;
    top: 50%;
    left: 50%;
    // margin: 0 auto;
    transform: translate(-50%, -50%);
    margin-top: 10px;
    text-align: center;
    padding: 20px;

    .demo-ruleForm {
        margin-top: 40px;
    }

    h3 {
        color: white;
        font-size: 25px;
    }
}
</style>