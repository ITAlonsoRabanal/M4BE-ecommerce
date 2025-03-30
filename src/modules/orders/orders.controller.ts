import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { addOrderDto } from "src/common/dtos/order.dto";
import { AuthGuard } from "../../common/guards/auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Orders')
@Controller("orders")

export class OrdersController {

    constructor(private readonly ordersService: OrdersService) {}
    @ApiBearerAuth()
    @Get()
    @UseGuards(AuthGuard)
    getAllOrders() {
        return this.ordersService.getAllOrders()
    }
    @ApiBearerAuth()
    @Get(":id")
    @UseGuards(AuthGuard)
    getOrder(@Param("id", ParseUUIDPipe) id: string) {
        return this.ordersService.getOrder(id)
    }
    @ApiBearerAuth()
    @Post()
    @UseGuards(AuthGuard)
    addOrder(@Body() order: addOrderDto) {
        return this.ordersService.addOrder(order)
    }
}