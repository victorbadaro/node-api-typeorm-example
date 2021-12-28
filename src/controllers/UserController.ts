import { Request, Response } from 'express';
import { getRepository, Not } from 'typeorm';
import { User } from '../entities/User';

class UserController {
    async index(request: Request, response: Response) {
        const repository = getRepository(User);
        const users = await repository.find();

        return response.json(users);
    }

    async find(request: Request, response: Response) {
        const { id } = request.params;
        const repository = getRepository(User);
        const user = await repository.findOne(id);

        if(!user)
            return response.status(400).json({ error: 'User not found!' });

        return response.json(user);
    }

    async create(request: Request, response: Response) {
        const { name, email } = request.body;
        const repository = getRepository(User);

        if(await repository.findOne({ where: {email} }))
            return response.status(400).json({ error: 'Email already exists!' });
        
        const user = repository.create({ name, email });

        await repository.save(user);

        return response.status(201).json(user);
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { name, email } = request.body;
        const repository = getRepository(User);
        const user = await repository.findOne(id);

        if(!user)
            return response.status(400).json({ error: 'User not found!' });
        
        if(await repository.findOne({ where: { email, id: Not(id) } }))
            return response.status(400).json({ error: 'Email already exists!' });
        
        user.name = name ? name : user.name;
        user.email = email ? email : user.email;

        await repository.save(user);

        return response.status(204).send();
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;
        const repository = getRepository(User);

        if(!await repository.findOne(id))
            return response.status(400).json({ error: 'User not found!' });
        
        await repository.delete(id);

        return response.status(204).send();
    }
}

export default new UserController();