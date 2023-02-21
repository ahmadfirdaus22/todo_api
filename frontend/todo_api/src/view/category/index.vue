<template>
    <div class="container" style="margin-top: 10px">
        <h1 style="
        padding: 10px;
        background-color: white;
        border-radius: 10px;
        text-align: center;
      ">
            Data Category
        </h1>
        <!-- <div style="
        width: 100%;
        background-color: white;
        padding: 10px;
        border-radius: 10px;
      ">
            <form @submit.prevent="handleCategory">
                <label for="">Category Name</label>
                <br>
                <div style="display: flex;">
                    <input type="text" name="name" placeholder="Category Name" class="form-control" v-model="form.name">

                    <button class="btn btn-primary">{{ btn }}</button>
                </div>
            </form>
        </div> -->
        <div class="row row-cols-1 row-cols-md-6 g-4" style="margin-top: 10px">
            <CategoryItem v-for="(category, idx) in categories" :category="category" :key="idx" @edit="handleEdit">
            </CategoryItem>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CategoryItem from "../../components/CategoryItem.vue";
import Forminput from "../../components/Forminput.vue";

export default {
    components: { CategoryItem, Forminput },
    data() {
        return {
            is_add: true,
            btn: "ADD",
            form: {
                name: "",
                is_active: 1,
            },
        };
    },
    computed: {
        ...mapState("category", ["categories"]),
    },
    mounted() {
        this.getCategories();
    },
    methods: {
        ...mapActions("category", [
            "getCategories",
            "postCategory",
            "updateCategory",
        ]),
        handleEdit(category) {
            (this.is_add = false), (this.btn = "EDIT");
            console.log(category)
            this.form = {
                name: category.name,
                id: category.id,
                is_active: category.is_active
            }
        },
        handleCategory() {
            if (this.is_add) {
                this.postCategory(this.form);
                this.form = {
                    name: "",
                };
                this.btn = "ADD"
            } else {
                this.updateCategory(this.form);
                this.is_add = true;
                this.form = {
                    name: "",
                };
                this.btn = "ADD"
            }
        },
    },
};
</script>
