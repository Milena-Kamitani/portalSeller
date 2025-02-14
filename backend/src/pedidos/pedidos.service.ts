import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pedido } from './schemas/pedido.schema';
import { Produto } from '../produtos/schemas/produto.schema';

@Injectable()
export class PedidosService {
  constructor(
    @InjectModel(Pedido.name) private pedidoModel: Model<Pedido>,
    @InjectModel(Produto.name) private produtoModel: Model<Produto>,
  ) {}

  async criar(pedido: Pedido): Promise<Pedido> {
    const produtos = await this.produtoModel.find({
      _id: { $in: pedido.produtos },
    });
    const total = produtos.reduce((acc, produto) => acc + produto.preco, 0);
    const pedidoCriado = new this.pedidoModel({ ...pedido, total });
    return pedidoCriado.save();
  }

  async listarTodos(): Promise<Pedido[]> {
    return this.pedidoModel.find().populate('produtos').exec();
  }
}