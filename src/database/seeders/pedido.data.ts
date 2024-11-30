import { Types } from 'mongoose';

export const PedidosData = [
  {
    _id: new Types.ObjectId('674b7944f7c758a70c72d101'),
    fecha: new Date(),
    comprador: new Types.ObjectId('6481e76153cdd52b5dabc101'),
    productos: [
      new Types.ObjectId('6481e76153cdd52b5dabc202'),
      new Types.ObjectId('6481e76153cdd52b5dabc203'),
    ],
  },
];
