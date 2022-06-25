<script lang="ts">
import { defineComponent } from "vue";
import notify from '../../functions'

interface Order {
  id: number,
  created_at: string,
  client_name: string,
  payed: boolean,
  amount: number,
  payment_card: string
}

interface Payment {
  payed: string,
  amount: number,
  payment_method: string,
  payment_card: string,
  name: string,
  last_name: string,
  month: number,
  year: number,
  cvv: number
}

export default defineComponent({
  data() {
    return new class {
      api = "http://localhost:8000/client/api/order/"
      order: Order = {} as Order;
      paynent: Payment = {} as Payment;
      orders: Order[] = [];
      err_detail = '';
    }();
  },
  methods: {
    getCategories(): void {
      this.$http.get(this.api).then((r: any) => {
        this.orders = r.data;
      });
    },
    getPayment() {
      let url = `${this.api}${this.order.id}/payment/`
      this.$http.get(url).then(r=>{
        this.paynent = r.data;
        $('#paymentDetailModal').modal('show');
      })
    },
    makePayment(ord: Order): void {
      this.order = ord;
      this.err_detail = '';
      this.paynent = {} as Payment;
      $('#makePaymentModal').modal('show');
    },
    confirmPayment(): void {
      let url = `${this.api}${this.order.id}/payment/`
      this.err_detail = '';
      this.$http.put(url, this.paynent).then(r=> {
        this.getCategories()
        $('#makePaymentModal').modal('hide');
        this.getPayment();
      }).catch(err => {
        this.err_detail = err.response.data.detail;
      })
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
          <h4 class="card-title mb-0">Lista de pedidos</h4>
          <!-- <p class="card-order">Last Campaign Performance</p> -->
        </div>
        <div class="card-body">
          <hr class="mt-0">
            <button class="btn btn-outline btn-secondary ml-1" @click="getCategories()">
              <i class="fa fa-refresh"></i> Actualizar
            </button>
          <hr>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha y Hora</th>
                <th>Cliente</th>
                <th>Monto</th>
                <th>Tarjeta</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="ord in orders" :key="ord.id">
                <td>{{ ord.id }}</td>
                <td>{{ ord.created_at }}</td>
                <td>{{ ord.client_name }}</td>
                <td>{{ ord.amount }}</td>
                <td>{{ ord.payed ? ord.payment_card : '--' }}</td>
                <td>
                  <button class="btn btn-sm btn-outline btn-info" @click="makePayment(ord)" v-if="!ord.payed"><i class="fa fa-edit"></i> Pagar</button>
                  <span v-else>--</span>
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
  <div id="makePaymentModal" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Realizar Pago</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <hr class="mt-0">
          <div class="form-group">
            <label class="form-label">Tarjeta</label>
            <input class="form-control" v-model="paynent.payment_card" minlength="16" maxlength="16" />
          </div>
          <div class="row">
            <div class="col-md-4 form-group">
              <label class="form-label">Mes</label>
              <input class="form-control" v-model="paynent.month" />
            </div>
            <div class="col-md-4 form-group">
              <label class="form-label">Año</label>
              <input class="form-control" v-model="paynent.year" />
            </div>
            <div class="col-md-4 form-group">
              <label class="form-label">CVV</label>
              <input class="form-control" v-model="paynent.cvv" />
            </div>
            <div class="col-md-6 form-group">
              <label class="form-label">Nombre</label>
              <input class="form-control" v-model="paynent.name" />
            </div>
            <div class="col-md-6 form-group">
              <label class="form-label">Apellido</label>
              <input class="form-control" v-model="paynent.last_name" />
            </div>
            <div class="col-12" v-if="err_detail">
              <div class="alert alert-danger">
                <span><b> Error: </b> {{ err_detail }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
          <button type="button" class="btn btn-success w-100" @click="confirmPayment()">Pagar S/ {{order.amount}}</button>
        </div>
      </div>
    </div>
  </div>
  <div id="paymentDetailModal" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <!-- <div class="modal-header">
          <h5 class="modal-title">Eliminar Categoría</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div> -->
        <div class="modal-body">
          <hr class="mt-0">
          <h4 class="text-center">Pago realizado</h4>
          <hr>
          <p class="text-center">Se ha confirmado el pago de <b>S/ {{ paynent.amount }}</b> con su tarjeta <b>{{ paynent.payment_method}}</b> que finaliza en <b>{{ paynent.payment_card }}</b> </p>
          <hr class="mt-0">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>