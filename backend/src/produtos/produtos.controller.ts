import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { Produto } from './schemas/produto.schema';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  async criar(@Body() produto: Produto): Promise<Produto> {
    return this.produtosService.criar(produto);
  }

  @Get()
  async listarTodos(): Promise<Produto[]> {
    return this.produtosService.listarTodos();
  }

  @Put(':id')
  async atualizar(@Param('id') id: string, @Body() produto: Produto): Promise<Produto> {
    return this.produtosService.atualizar(id, produto);
  }

  @Delete(':id')
  async remover(@Param('id') id: string): Promise<void> {
    return this.produtosService.remover(id);
  }
}