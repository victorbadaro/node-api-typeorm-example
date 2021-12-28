import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Product } from '../entities/Product';
import { User } from '../entities/User';

class ProductController {
    async index(request: Request, response: Response) {
        const repository = getRepository(Product);
        const products = await repository.find({
            relations: ['user']
        });

        return response.json(products);
    }

    async find(request: Request, response: Response) {
        const { id } = request.params;
        const repository = getRepository(Product);
        const product = await repository.findOne(id);

        if(!product)
            return response.status(400).json({ error: 'Product not found!' });

        return response.json(product);
    }

    async create(request: Request, response: Response) {
        const { description, user_id } = request.body;
        const productRepository = getRepository(Product);
        const userRepository = getRepository(User);

        if(!description)
            return response.status(400).json({ error: 'Product description can\'t be null' });
        
        if(user_id === null)
            return response.status(400).json({ error: 'User ID can\'t be null' });
        
        if(!await userRepository.findOne(user_id))
            return response.status(400).json({ error: 'User not found!' });
        
        const product = productRepository.create({ description, user_id });

        await productRepository.save(product);

        return response.status(201).json(product);
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { description } = request.body;
        const repository = getRepository(Product);
        const product = await repository.findOne(id);

        if(!product)
            return response.status(400).json({ error: 'Product not found!' });
        
        if(!description)
            return response.status(400).json({ error: 'Product description can\'t be null' });
        
        product.description = description;

        await repository.save(product);

        return response.status(204).send();
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;
        const repository = getRepository(Product);

        if(!await repository.findOne(id))
            return response.status(400).json({ error: 'Product not found!' });
        
        await repository.delete(id);

        return response.status(204).send();
    }
}

export default new ProductController();