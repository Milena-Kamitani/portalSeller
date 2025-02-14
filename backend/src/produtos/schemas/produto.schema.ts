import { Schema, Document } from 'mongoose';

export const ProdutoSchema = new Schema({
  nome: { type: String, required: true },
  preco: { type: Number, required: true },
  descricao: { type: String, required: true },
});

export interface Produto extends Document {
  nome: string;
  preco: number;
  descricao: string;
}