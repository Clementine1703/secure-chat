<template>
    <transition name="fade">
        <div class="wrapper position-absolute bottom-0 end-0 mx-2">
            <div v-for="alert in GET_ACTIVE_ALERTS" :key="alert.id" class="alert alert-success fade show bottom-0 end-0"
                role="alert">
                <strong>Holy guacamole!</strong> {{ alert.text }}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    </transition>
</template>

<script>
// import { Toast } from 'bootstrap';
import { mapGetters } from 'vuex';


export default {
    name: 'InformationAlert',
    computed: {
        ...mapGetters(['GET_ACTIVE_ALERTS']),
    },
    watch: {
    },
    methods: {

    },

}

</script>

<style scoped>
.wrapper {
    top: 56;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active до версии 2.1.8 */
    {
    opacity: 0;
    }
</style>