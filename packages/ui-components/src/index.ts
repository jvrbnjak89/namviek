// Use this file to export React client components (e.g. those with 'use client' directive) or other non-server utilities

import ModalComp from './components/Modal'
import * as FormControls from './components/Controls'
import ButtonControl from './components/Button'
import useFormHook from './hooks/useForm'
import AvatarContainer from './components/Avatar'
import DatePickerContainer from './components/DatePicker'
import BorderlessDatePickerContainer from './components/DatePicker/Borderless'
import ScrollbarContainer from './components/Scrollbar'
import FormGroupContainer from './components/FormGroup'
import TooltipContainer from './components/Tooltip'
import LoadingContainer from './components/Loading/LoadingContainer'
import TimelineContainer from './components/Timeline'
import DropdownMenuContainer from './components/Dropdown'
import TabContainer from './components/Tab'
import PopoverContainer from './components/Controls/PopoverControl'
import SwitchContainer from './components/Switch'
import DialogContainer from "./components/Dialog";
import CardContainer from './components/Card'
import IconColorPickerContainer, { colors as colorPickers } from "./components/IconColorPicker";

export {
  messageInfo,
  messageError,
  messageSuccess,
  messageWarning
} from './components/Message'
export { setFixLoading } from './components/Loading'

export const Dialog = DialogContainer
export const Card = CardContainer
export const Switch = SwitchContainer
export const Popover = PopoverContainer
export const Modal = ModalComp
export const Form = FormControls
export const Button = ButtonControl
export const useForm = useFormHook
export const Loading = LoadingContainer
export const Avatar = AvatarContainer
export const DatePicker = DatePickerContainer
export const DatePickerBorderless = BorderlessDatePickerContainer
export const Scrollbar = ScrollbarContainer
export const FormGroup = FormGroupContainer
export const Tooltip = TooltipContainer
export const Timeline = TimelineContainer
export const DropdownMenu = DropdownMenuContainer
export const Tab = TabContainer

export const IconColorPicker = IconColorPickerContainer
export const colors = colorPickers
// export * from './components/IconColorPicker'
export * from './components/Confirmbox'
export * from './components/Timeline/type'

export * from './components/Controls/ListControl/type'
export * from './components/utils'
