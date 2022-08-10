<template>
    <div class="py-4 container-fluid">
        <div class=" row">
            <div class="col-12">
                <NFTTable />
            </div>
        </div>
    </div>
</template>
<script>
import NFTTable from "./components/NFTTable.vue";
export default {
    data() {
        return {

        };
    },
    components: {
        NFTTable
    },

    created() {
        let user = localStorage.getItem("user") ?? false;
        if (!user) {
            this.$router.push('/signin');
        }
    }
};
</script>
