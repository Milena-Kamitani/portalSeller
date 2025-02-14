import { Controller, Get, Post, Body } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { Pedido } from './schemas/pedido.schema';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  async criar(@Body() pedido: Pedido): Promise<Pedido> {
    return this.pedidosService.criar(pedido);
  }

  @Get()
  async listarTodos(): Promise<Pedido[]> {
    return this.pedidosService.listarTodos();
  }
}