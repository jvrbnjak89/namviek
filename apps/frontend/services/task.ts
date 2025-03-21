import { Task, TaskPriority } from '@prisma/client'
import { httpDel, httpGet, httpPost, httpPut } from './_req'
import { IFilterAdvancedData } from '@/features/FilterAdvanced/type'

type ITaskFields = Partial<Task>

export const taskGetAll = (projectId: string, signal?: AbortSignal) => {
  const config: { [key: string]: unknown } = {}
  if (signal) {
    config.signal = signal
  }
  return httpGet(`/api/project/task?projectId=${projectId}`, config)
}

export interface ITaskQuery {
  projectId?: string
  projectIds?: string[]
  title?: string
  dueDate?: [Date | string, Date | string]
  assigneeIds?: string[]
  statusIds?: string[]
  taskPoint?: number
  priority?: TaskPriority
  done?: 'yes' | 'no'
  take?: number
  skip?: number
  orderBy?: [string, 'asc' | 'desc']
  counter?: boolean
}

export const taskGetByCond = (query: ITaskQuery, signal?: AbortSignal) => {
  return httpGet(`/api/project/task/query`, {
    params: query,
    signal: signal
  })
}

type ITaskExportQuery = Omit<ITaskQuery, 'projectId'> & {
  projectIds?: string[]
}

export const taskExportByCond = (
  query: ITaskExportQuery,
  signal?: AbortSignal
) => {
  return httpGet(`/api/project/task/export`, {
    params: query,
    signal: signal
  })
}

export const taskAdd = (data: ITaskFields) => {
  return httpPost('/api/project/task', data)
}

export const taskUpdate = (data: ITaskFields) => {
  return httpPut('/api/project/task', data)
}
export const taskUpdateMany = (ids: string[], data: ITaskFields) => {
  return httpPut('/api/project/task-many', {
    ids,
    data
  })
}

export const taskDelete = (data: { projectId: string; id: string }) => {
  return httpDel('/api/project/task', {
    params: data
  })
}

export const taskDeletes = (data: { projectId: string; ids: string[] }) => {
  return httpDel('/api/project/tasks', {
    params: data
  })
}

export const taskAddMany = (data: {
  data: ITaskFields[]
  projectId: string
}) => {
  return httpPost('/api/project/tasks', data)
}

export const taskCounterByUser = (
  projectIds: string[],
  signal: AbortSignal
) => {
  return httpGet('/api/project/task/counter', {
    params: { projectIds },
    signal
  })
}

export const taskMakeCover = (data: {
  taskId: string
  url: string
  projectId: string
}) => {
  return httpPost('/api/project/task/make-cover', data)
}

export const serviceTask = {
  reorder: (data: { updatedOrder: [string, number][]; projectId: string }) => {
    return httpPost('/api/task/reorder', data)
  }
}

export const taskGetCustomQuery = (
  projectId: string,
  filter: IFilterAdvancedData,
  signal?: AbortSignal,
  options?: {
    cursor?: string
    limit?: number
    orderBy?: { [key: string]: 'asc' | 'desc' }
  }
) => {
  return httpPost('/api/project/task/custom-field/query', {
    projectId,
    filter,
    options
  }, {
    signal
  })
}
