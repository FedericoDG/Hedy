import { Types } from 'mongoose';

export const compradoresData = [
  {
    _id: new Types.ObjectId('6481e76153cdd52b5dabc101'),
    nombre: 'Juan',
    apellido: 'Pérez',
    telefono: '3517564940',
    direcciones: [
      {
        calle: 'Belgrano',
        numero: '1740',
        ciudad: 'Córdoba',
      },
    ],
  },
  {
    _id: new Types.ObjectId('6481e76153cdd52b5dabc102'),
    nombre: 'María',
    apellido: 'Gómez',
    telefono: '3516114160',
    direcciones: [
      {
        calle: 'Av. del Sol',
        numero: '1099',
        ciudad: 'Villa de Merlo',
      },
      {
        calle: 'Av. Norte',
        numero: '2705',
        ciudad: 'Villa de Merlo',
      },
    ],
  },
  {
    _id: new Types.ObjectId('6481e76153cdd52b5dabc103'),
    nombre: 'Luis',
    apellido: 'Ramírez',
    telefono: '3518224790',
    direcciones: [
      {
        calle: 'Ovidio Lagos',
        numero: '611',
        ciudad: 'Córdoba',
      },
    ],
  },
  {
    _id: new Types.ObjectId('6481e76153cdd52b5dabc104'),
    nombre: 'Ana',
    apellido: 'López',
    telefono: '3519513622',
    direcciones: [
      {
        calle: 'Pringles',
        numero: '1050',
        ciudad: 'San Luis',
      },
    ],
  },
  {
    _id: new Types.ObjectId('6481e76153cdd52b5dabc105'),
    nombre: 'Carlos',
    apellido: 'Martínez',
    telefono: '3517415140',
  },
];
