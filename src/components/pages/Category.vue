<script lang="ts">
import { defineComponent } from "vue";
import notify from '../../functions'

interface Category {
  id: number,
  name: string,
  description: string,
  upper: number
  upper_name: string
}

export default defineComponent({
  data() {
    return new class {
      api = "http://localhost:8000/internal/api/category/"
      category: Category = {} as Category;
      categories: Category[] = [];
      upper_categories: Category[] = [];
    }();
  },
  methods: {
    getCategories(): void {
      this.$http.get(this.api).then((r: any) => {
        this.categories = r.data;
      });
    },
    addBtn(): void {
      this.category = {} as Category; // clean category
      this.upper_categories = this.categories;
      $('#categoryModal').modal('show');
    },
    editBtn(cat: Category): void {
      var url0 = `${this.api}?exclude=${cat.id}`;
      this.$http.get(url0).then((r: any) => {
        this.upper_categories = r.data;
      });
      var url = `${this.api}${cat.id}/`;
      this.$http.get(url).then((r: any) => {
        this.category = r.data;
      });
      $('#categoryModal').modal('show');
    },
    saveCategory() {
      var url  = this.api;
      var action;
      var message: string;
      if (!this.category.id) {
        action = this.$http.post
        message = 'Registrado correctamente';
      } else {
        url += `${this.category.id}/`;
        action = this.$http.patch
        message = 'Actualizado correctamente';
      }
      action(url, this.category).then(
        r => {
          $('#categoryModal').modal('hide');
          this.getCategories();
          notify({
            type: 'success',
            message: message
          })
        }
      )
    },
    deleteBtn(cat: Category) {
      this.category = cat;
      $('#deleteCategoryModal').modal('show');
    },
    confirmDelete() {
      var url = `${this.api}${this.category.id}/`;
      this.$http.delete(url).then(
        r => {
          $('#deleteCategoryModal').modal('hide');
          $('#categoryModal').modal('hide');
          this.getCategories();
          notify({
            type: 'success',
            message: 'Eliminado correctamente'
          })
        }
      )
    }
  },
  mounted() {
    this.getCategories();
  },
});
</script>
<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title mb-0">Lista de categorías</h4>
          <!-- <p class="card-category">Last Campaign Performance</p> -->
        </div>
        <div class="card-body">
          <hr class="mt-0">
            <button class="btn btn-outline btn-primary" @click="addBtn()">
              <i class="fa fa-plus"></i> Agregar
            </button>
            <button class="btn btn-outline btn-secondary ml-1" @click="getCategories()">
              <i class="fa fa-refresh"></i> Actualizar
            </button>
          <hr>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Categoría superior</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cat in categories" :key="cat.id">
                <td>{{ cat.id }}</td>
                <td>{{ cat.name }}</td>
                <td>{{ cat.upper_name || "-" }}</td>
                <td>
                  <button class="btn btn-sm btn-outline btn-info" @click="editBtn(cat)"><i class="fa fa-edit"></i> Editar</button>
                  <button class="btn ml-1 btn-sm btn-outline btn-danger" @click="deleteBtn(cat)" ><i class="fa fa-trash"></i> Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
          <hr />
          <!-- <div class="stats">
            <i class="fa fa-clock-o"></i> Campaign sent 2 days ago
          </div> -->
        </div>
      </div>
    </div>
  </div>
  <div id="categoryModal" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" v-if="!category.id">Agregar Categoría</h5>
          <h5 class="modal-title" v-else>Editar Categoría</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <hr class="mt-0">
          <div class="form-group" v-if="category.id">
            <label class="form-label">ID</label>
            <input class="form-control" disabled v-model="category.id" />
          </div>
          <div class="form-group">
            <label class="form-label">Nombre</label>
            <input class="form-control" v-model="category.name" />
          </div>
          <div class="form-group">
            <label class="form-label">Categoría Superior</label>
            <select class="form-control" v-model="category.upper">
              <option :value="null" selected>--------</option>
              <option v-for="opt in upper_categories" :key="opt.id" :value="opt.id">{{ opt.name }}</option>
            </select>
            <!-- <input class="form-control" v-model="category.upper" /> -->
          </div>
          <div class="form-group">
            <label class="form-label">Descripción</label>
            <textarea class="form-control" v-model="category.description" />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="saveCategory()">Guardar</button>
        </div>
      </div>
    </div>
  </div>
  <div id="deleteCategoryModal" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Eliminar Categoría</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <hr class="mt-0">
          <h4 class="text-center">¿Seguro que desea eliminar esta categoría?</h4>
          <table class="table mb-0">
            <tbody>
              <tr>
                <th>ID</th>
                <td>{{ category.id }}</td>
              </tr>
              <tr>
                <th>Nombre</th>
                <td>{{ category.name }}</td>
              </tr>
            </tbody>
          </table>
          <hr class="mt-0">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-danger" @click="confirmDelete()">Confirmar</button>
        </div>
      </div>
    </div>
  </div>
</template>