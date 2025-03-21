import { DraggableProvided } from 'react-beautiful-dnd'
import { MdDragIndicator } from 'react-icons/md'
// import { BoardActionCreateTaskWithIcon } from './BoardActionCreateTask'
import { useTaskFilter } from '@/features/TaskFilter/context'
import { Avatar } from '@ui-components'
import Badge from '@/components/Badge'
import useTaskFilterContext from '@/features/TaskFilter/useTaskFilterContext'
// import TaskCheckAll from '../views/TaskCheckAll'

interface IBoardHeaderProps {
  color?: string
  icon?: string
  name: string
  id: string
  total: number
  provided: DraggableProvided
}
export default function BoardHeader({
  color,
  icon,
  name,
  total,
  id,
  provided
}: IBoardHeaderProps) {
  const { isGroupbyAssignee, isGroupbyStatus, groupByLoading } =
    useTaskFilterContext()

  return (
    <div className="board-header">
      <div
        className={`board-header-loading ${
          groupByLoading ? 'visible' : 'invisible '
        }`}></div>
      <div className="board-col-header">
        <div
          className={`board-header-section ${
            groupByLoading ? 'opacity-0' : 'opacity-100'
          }`}>
          {isGroupbyStatus ? (
            <div
              className="w-3 h-4 text-gray-400"
              {...provided.dragHandleProps}>
              <MdDragIndicator />
            </div>
          ) : null}
          {/* <TaskCheckAll groupId={id}/> */}
          {isGroupbyAssignee ? (
            <Avatar size="md" name={name} src={icon || ''} />
          ) : (
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: color }}></div>
          )}
          <span className="text-sm text-gray-500">{name}</span>
          <Badge title={total + ''} />
        </div>
        <div>{/* <BoardActionCreateTaskWithIcon groupId={id} /> */}</div>
      </div>
    </div>
  )
}
