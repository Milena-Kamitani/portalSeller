import { Schema, Document } from 'mongoose';

export const PedidoSchema = new Schema({
  produtos: [{ type: Schema.Types.ObjectId, ref: 'Produto' }],
  total: { type: Number, required: true },
  data: { type: Date, default: Date.now },
});

export interface Pedido extends Document {
  produtos: string[];
  total: number;
  data: Date;
}