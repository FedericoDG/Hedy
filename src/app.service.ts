import { Db } from 'mongodb';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(@Inject('MONGO') private readonly mongo: Db) {}

  async getTasks() {
    const tasksCollection = this.mongo.collection('tasks');
    const tasks = await tasksCollection.find().toArray();

    return tasks.map((task) => ({
      ...task,
      _id: task._id.toString(),
    }));
  }
}
