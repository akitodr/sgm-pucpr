import api from './api';

const endPoint = '/courses';

export default {
  get: () => api.get(endPoint),
  create: (name: string) => api.post(endPoint, { name }),
};
