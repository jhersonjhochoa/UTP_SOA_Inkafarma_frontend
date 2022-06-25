<script lang="ts">
import { defineComponent } from "vue";
import notify from '../../functions'

interface PaymentMethod {
  id: number,
  name: string,
  code: string,
  image: string | File
}

export default defineComponent({
  data() {
    return new class {
      api = "http://localhost:8000/internal/api/payment-method/"
      pm: PaymentMethod = {} as PaymentMethod;
      pms: PaymentMethod[] = [];
      current_image = '';
    }();
  },
  methods: {
    getPaymentMethods(): void {
      this.$http.get(this.api).then((r: any) => {
        this.pms = r.data;
      });
    },
    addBtn(): void {
      this.pm = {} as PaymentMethod; // clean category
      (this.$refs.imageFile as HTMLInputElement).value = '';
      $('#pmModal').modal('show');
    },
    editBtn(cat: PaymentMethod): void {
      var url = `${this.api}${cat.id}/`;
      (this.$refs.imageFile as HTMLInputElement).value = '';
      this.$http.get(url).then((r: any) => {
        this.pm = r.data;
        this.current_image = String(this.pm.image);
      });
      $('#pmModal').modal('show');
    },
    previewFiles() {
      console.log('file', this.$refs.imageFile)
      this.pm.image = (this.$refs.imageFile as HTMLInputElement).files![0];
    },
    savePaymentMethods() {
      var url  = this.api;
      var action;
      var message: string;
      if (!this.pm.id) {
        action = this.$http.post
        message = 'Registrado correctamente';
      } else {
        url += `${this.pm.id}/`;
        action = this.$http.patch
        message = 'Actualizado correctamente';
      }
      let data = new FormData()
      if (typeof this.pm.image == 'string') {
        this.pm.image = '';
      }
      let keys = Object.keys(this.pm) as Array<keyof PaymentMethod>
      keys.map(key => {
        if (this.pm[key]) {
          data.append(key, this.pm[key] as Blob)
        }
      })
      action(url, data).then(
        r => {
          $('#pmModal').modal('hide');
          this.getPaymentMethods();
          notify({
            type: 'success',
            message: message
          })
        }
      )
    },
    deleteBtn(cat: PaymentMethod) {
      this.pm = cat;
      $('#deletepmModal').modal('show');
    },
    confirmDelete() {
      var url = `${this.api}${this.pm.id}/`;
      this.$http.delete(url).then(
        r => {
          $('#deletepmModal').modal('hide');
          $('#pmModal').modal('hide');
          this.getPaymentMethods();
          notify({
            type: 'success',
            message: 'Eliminado correctamente'
          })
        }
      )
    }
  },
  mounted() {
    this.getPaymentMethods();
  },
});

</script>
<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title mb-0">Lista de métodos de pago</h4>
          <!-- <p class="card-category">Last Campaign Performance</p> -->
        </div>
        <div class="card-body">
          <hr class="mt-0">
            <button class="btn btn-outline btn-primary" @click="addBtn()">
              <i class="fa fa-plus"></i> Agregar
            </button>
            <button class="btn btn-outline btn-secondary ml-1" @click="getPaymentMethods()">
              <i class="fa fa-refresh"></i> Actualizar
            </button>
          <hr>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Código</th>
                <th>Nombre</th>
                <th>Imágen</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="pmet in pms" :key="pmet.id">
                <td>{{ pmet.id }}</td>
                <td>{{ pmet.code }}</td>
                <td>{{ pmet.name }}</td>
                <td>
                  <img v-if="pmet.image" width="31" :src="String(pmet.image)" />
                  <span v-else>-</span>
                </td>
                <td>
                  <button class="btn btn-sm btn-outline btn-info" @click="editBtn(pmet)"><i class="fa fa-edit"></i> Editar</button>
                  <button class="btn ml-1 btn-sm btn-outline btn-danger" @click="deleteBtn(pmet)" ><i class="fa fa-trash"></i> Eliminar</button>
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
  <div id="pmModal" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" v-if="!pm.id">Agregar Método de pago</h5>
          <h5 class="modal-title" v-else>Editar Método de pago</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <hr class="mt-0">
          <div class="form-group" v-if="pm.id">
            <label class="form-label">ID</label>
            <input class="form-control" disabled v-model="pm.id" />
          </div>
          <div class="form-group">
            <label class="form-label">Código</label>
            <input class="form-control" v-model="pm.code" maxlength="4"/>
          </div>
          <div class="form-group">
            <label class="form-label">Nombre</label>
            <input class="form-control" v-model="pm.name" />
          </div>
          <div class="form-group">
            <label class="form-label">Imágen:</label>
            <div v-if="pm.id" class="mt-n3">
              <img :src="current_image"><br>
              <label class="form-label">Cambiar imágen:</label>
            </div>
            <input type="file" class="form-control" ref="imageFile" @change="previewFiles()" />
          </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="savePaymentMethods()">Guardar</button>
        </div>
      </div>
    </div>
  </div>
    <div id="deletepmModal" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Eliminar Método de Pago</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <hr class="mt-0">
          <h4 class="text-center">¿Seguro que desea eliminar este método de pago?</h4>
          <table class="table mb-0">
            <tbody>
              <tr>
                <th>ID</th>
                <td>{{ pm.id }}</td>
              </tr>
              <tr>
                <th>Nombre</th>
                <td>{{ pm.name }}</td>
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