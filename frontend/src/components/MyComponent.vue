<template>
    <div class="my-component">
        <h1 v-if="isVisible">{{ message }}</h1>
        <button v-on:click="toggleVisibility">Palanca de visibilidad</button>
    </div>
</template>

<script>
export default {
    name: "MyComponent",
    data() {
        return {
            message: "mycomponent dice hello world with vue",
            isVisible: true
        }
    },
    methods: {
        toggleVisibility() {
            this.isVisible = !this.isVisible
        }
    }
}
</script>