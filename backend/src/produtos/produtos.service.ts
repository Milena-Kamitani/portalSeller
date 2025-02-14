import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Produto } from './schemas/produto.schema';
import { Cache } from 'cache-manager';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectModel(Produto.name) private produtoModel: Model<Produto>,
    @Inject(CACHE_MANAGER) private gerenciadorCache: Cache,
  ) {}

  async criar(produto: Produto): Promise<Produto> {
    const produtoCriado = new this.produtoModel(produto);
    return produtoCriado.save();
  }

  async listarTodos(): Promise<Produto[]> {
    const produtosCache = await this.gerenciadorCache.get<Produto[]>('produtos');
    if (produtosCache) {
      return produtosCache;
    }
    const produtos = await this.produtoModel.find().exec();
    await this.gerenciadorCache.set('produtos', produtos, { ttl: 600 });
    return produtos;
  }

  async atualizar(id: string, produto: Produto): Promise<Produto> {
    return this.produtoModel.findByIdAndUpdate(id, produto, { new: true });
  }

  async remover(id: string): Promise<void> {
    await this.produtoModel.findByIdAndDelete(id);
  }
}
