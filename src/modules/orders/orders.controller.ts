import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { addOrderDto } from "src/common/dtos/order.dto";
import { AuthGuard } from "../auth/auth.guard";

@Controller("orders")

export class OrdersController {

    constructor(private readonly ordersService: OrdersService) {}

    @Get()
    @UseGuards(AuthGuard)
    getAllOrders() {
        return this.ordersService.getAllOrders()
    }

    @Get(":id")
    getOrder(@Param("id", ParseUUIDPipe) id: string) {
        return this.ordersService.getOrder(id)
    }

    @Post()
    addOrder(@Body() order: addOrderDto) {
        return this.ordersService.addOrder(order)
    }
}