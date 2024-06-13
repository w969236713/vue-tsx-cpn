import { instance } from '@/api/axios'

export const getSelectOption = async (params: any) => {
  return instance.get('https://randomuser.me/api/', { params })
}
