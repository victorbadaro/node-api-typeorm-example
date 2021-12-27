import { Request, Response } from 'express';

class ProductController {
    async index(request: Request, response: Response) {
        return response.json();
    }

    async find(request: Request, response: Response) {
        const { id } = request.params;

        return response.json();
    }

    async create(request: Request, response: Response) {
        const { description, user_id } = request.body;

        return response.status(201).json();
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { description } = request.body;

        return response.status(204).send();
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        return response.status(204).send();
    }
}

export default new ProductController();