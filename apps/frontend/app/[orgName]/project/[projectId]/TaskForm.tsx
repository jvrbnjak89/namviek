import { Button, DatePicker, Form, messageWarning } from '@ui-components'
import MemberPicker from '@/components/MemberPicker'
import PrioritySelect from '@/components/PrioritySelect'
import StatusSelect from '@/components/StatusSelect'
import { TaskPriority, TaskStatus, TaskType } from '@prisma/client'
import { useFormik } from 'formik'
import { validateTask } from '@namviek/core/validation'
import { useParams } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { useProjectStatusStore } from 'apps/frontend/store/status'
import FileControl from '@/components/FileKits/FileControl'
import Activity from '@/features/Activity'
import TaskTypeSelect from '@/components/TaskTypeSelect'
import { useUser } from '@auth-client'
import MultiMemberPicker from '@/components/MultiMemberPicker'

export const defaultFormikValues: ITaskDefaultValues = {
  title: '',
  cover: '',
  assigneeIds: [],
  type: TaskType.TASK,
  fileIds: [],
  taskStatusId: '',
  priority: TaskPriority.LOW,
  startDate: new Date('1991-1-10 08:00'),
  dueDate: new Date(),
  plannedDueDate: new Date(),
  planedStartDate: new Date(),
  progress: 0,
  desc: '<p>Tell me what this task about 🤡</p>'
}

export interface ITaskDefaultValues {
  title: string
  assigneeIds: string[]
  type: TaskType
  cover: string
  fileIds: string[]
  taskStatusId: string
  priority: TaskPriority
  startDate: Date
  dueDate: Date
  plannedDueDate: Date
  planedStartDate: Date
  desc: string
  progress: number
}
interface ITaskFormProps {
  isUpdate?: boolean
  taskStatusId?: string
  dueDate?: Date
  defaultValue?: ITaskDefaultValues
  onSubmit: (v: ITaskDefaultValues) => void
}

export default function TaskForm({
  dueDate,
  isUpdate = false,
  taskStatusId,
  onSubmit,
  defaultValue = defaultFormikValues
}: ITaskFormProps) {
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const { statuses } = useProjectStatusStore()
  const { user } = useUser()
  const refDefaultValue = useRef<ITaskDefaultValues>(defaultValue)
  // const submitTimeout = useRef(0)

  if (user?.id) {
    refDefaultValue.current = { ...refDefaultValue.current, assigneeIds: [user.id] }
  }

  if (dueDate) {
    refDefaultValue.current = { ...refDefaultValue.current, dueDate }
  }

  if (taskStatusId) {
    refDefaultValue.current = { ...refDefaultValue.current, taskStatusId }
  }

  const formik = useFormik({
    initialValues: refDefaultValue.current,
    onSubmit: values => {
      if (loading) {
        messageWarning('Server is processing')
        return
      }

      setLoading(true)
      const mergedValues = { ...values, projectId: params.projectId }
      if (!Array.isArray(mergedValues.assigneeIds)) {
        mergedValues.assigneeIds = [mergedValues.assigneeIds]
      }

      const { error, errorArr } = validateTask(mergedValues)

      if (error) {
        setLoading(false)
        console.error(errorArr)
        return
      }

      onSubmit(mergedValues)
    }
  })

  // select a default status if empty
  useEffect(() => {
    if (statuses.length && !formik.values.taskStatusId) {
      let min: TaskStatus | null = null
      statuses.forEach(stt => {
        if (!min) {
          min = stt
          return
        }

        if (min.order > stt.order) {
          min = stt
        }
      })

      if (min) {
        const status = min as TaskStatus
        formik.setFieldValue('taskStatusId', status.id)
      }
    }
  }, [statuses])

  const isCreate = !isUpdate

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="task-form space-y-3 gap-6 relative">
      <div
        className={`sm:flex items-start gap-3 ${isCreate ? 'flex-col' : ''}`}>
        <div className="task-form-detail space-y-3 w-full">
          <Form.Input
            title="Task name"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            placeholder="Enter your task name here !"
          />
          <Form.Range
            title="Progress"
            step={5}
            value={formik.values.progress}
            onChange={v => {
              formik.setFieldValue('progress', v)
            }}
          />
          <Form.TextEditor
            title="Description"
            value={formik.values.desc}
            onChange={v => {
              formik.setFieldValue('desc', v)
            }}
          />
          {isUpdate ? <FileControl /> : null}
          {/* {isUpdate ? <Activity /> : null} */}
        </div>
        <div
          className={`task-form-right-actions space-y-3 ${isCreate ? 'w-full' : 'sm:w-[200px]'
            }  shrink-0`}>
          <TaskTypeSelect value={formik.values.type} onChange={val => {
            formik.setFieldValue('type', val)
          }} title="Task types" />
          <MultiMemberPicker
            title="Assignees"
            value={formik.values.assigneeIds}
            onChange={val => {
              console.log('assignee:', val)
              formik.setFieldValue('assigneeIds', val)
            }}
          />
          <StatusSelect
            title="Status"
            value={formik.values.taskStatusId}
            onChange={val => {
              formik.setFieldValue('taskStatusId', val)
              console.log('status', val)
            }}
          />
          <PrioritySelect
            title="Priority"
            value={formik.values.priority}
            onChange={val => {
              formik.setFieldValue('priority', val)
              console.log('alo', val)
            }}
          />
          <DatePicker
            title="Due date"
            value={formik.values.dueDate}
            onChange={d => {
              formik.setFieldValue('dueDate', d)
            }}
          />
          {/* <DatePicker */}
          {/*   title="Planned Start date" */}
          {/*   value={formik.values.planedStartDate} */}
          {/*   onChange={d => { */}
          {/*     formik.setFieldValue('plannedStartDate', d) */}
          {/*   }} */}
          {/* /> */}
          {/* <DatePicker */}
          {/*   title="Planned Due date" */}
          {/*   value={formik.values.plannedDueDate} */}
          {/*   onChange={d => { */}
          {/*     formik.setFieldValue('plannedDueDate', d) */}
          {/*   }} */}
          {/* /> */}
          <div className="text-right">
            {/* <Button title="Close" onClick={onClose} /> */}
            <Button type="submit" loading={loading} title="Submit" primary />
          </div>
        </div>
      </div>
    </form>
  )
}
