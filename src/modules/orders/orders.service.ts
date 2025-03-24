import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { isUUID } from "class-validator";
import { addOrderDto } from "src/common/dtos/order.dto";
import { Order } from "src/common/entities/orders.entity";
import { Repository } from "typeorm";
import { UsersService } from "../users/users.service";
import { ProductsService } from "../products/products.service";
import { OrderDetail } from "src/common/entities/orderDetails.entity";

@Injectable()
export class OrdersService {

    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(OrderDetail)
        private readonly orderDetailRepository: Repository<OrderDetail>,
        @Inject()
        private readonly usersService: UsersService,
        @Inject() 
        private readonly productsService: ProductsService,
    ) {}


    async getAllOrders() {
        return this.orderRepository.find({
            relations: ['user', 'orderDetail'],
        })
    }
    async getOrder(id: string) {
        if (!isUUID(id)) {
            throw new NotFoundException(`ID no válido: ${id}`);
        }
        const user = await this.orderRepository.findOne({ where: { id } });
        if (!user) { 
            throw new NotFoundException(`Orden con ID ${id} no encontrado`);
        }
        return user;
    }

    async addOrder(order: addOrderDto) {
        const user = await this.usersService.getUserById(order.userId);
        if (!user) {
            throw new NotFoundException(`Usuario con ID ${order.userId} no encontrado al crear la orden`);
        }

        const allProducts = await this.productsService.getProducts();
        
        const selectedProducts = allProducts.products.filter(product => 
            order.products.some(reqProduct => reqProduct.id === product.id) && product.stock > 0
        );

        if (selectedProducts.length === 0) {
            throw new BadRequestException('No hay productos disponibles en stock para la orden.');
        }

        const totalPrice = selectedProducts.reduce((sum, product) => sum + product.price, 0);

        console.log(`PRECIO TOTAL ${totalPrice}`);
        

        const orderDetail = this.orderDetailRepository.create({
            price: totalPrice,
            products: selectedProducts
        });

        await this.orderDetailRepository.save(orderDetail);

        const newOrder = this.orderRepository.create({
            user,
            orderDetail
        });

        await this.orderRepository.save(newOrder);

        return {
            orderId: newOrder.id,
            total: totalPrice,
            products: selectedProducts
        };
    }

    

}