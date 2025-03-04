'use client'

import EmojiInput from '@/components/EmojiInput'
import { useDebounce } from '@/hooks/useDebounce'
import { orgGetById, orgUpdate } from '@/services/organization'
import {
  Button,
  Form,
  FormGroup,
  confirmAlert,
  messageSuccess
} from '@ui-components'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { useUserRole } from '../UserPermission/useUserRole'
import { useGetParams } from '@/hooks/useGetParams'

export default function SettingAbout() {
  const { orgId } = useGetParams()
  const { orgRole } = useUserRole()
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      name: '',
      desc: '',
      cover:
        'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f344.png'
    },
    onSubmit: values => {
      console.log(values)
      if (!orgId) return

      if (orgRole !== 'ADMIN') {
        confirmAlert({
          title: 'Restrict Action !',
          message:
            'Sorry, you do not have permission to do this action. Please contact to admin.',
          yes: () => {
            console.log(1)
          }
        })
        return
      }
      orgUpdate({
        id: orgId,
        name: values.name,
        cover: values.cover,
        desc: values.desc
      })
        .then(res => {
          const orgName = res.data.data.slug

          messageSuccess('Updated successully')
          router.replace(`${orgName}/setting/about`)
        })
        .catch(err => {
          console.log(err)
        })
    }
  })

  const registerForm = (
    name: keyof typeof formik.values,
    handler: typeof formik
  ) => {
    return {
      name,
      error: handler.errors[name],
      value: handler.values[name],
      onChange: handler.handleChange
    }
  }

  useDebounce(() => {
    if (!orgId) return

    orgGetById(orgId).then(res => {
      const { data } = res.data

      formik.setValues({
        name: data.name,
        cover: data.cover,
        desc: data.desc
      })
    })
  }, [orgId])

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormGroup title="Organization name">
        <EmojiInput
          value={formik.values.cover}
          onChange={val => {
            formik.setFieldValue('cover', val)
          }}
        />

        <Form.Input className="w-full" {...registerForm('name', formik)} />
      </FormGroup>

      <Form.Textarea title="Description" {...registerForm('desc', formik)} />
      <div className="org-form mt-4 space-y-4 text-right">
        <Button type="submit" title="Save it" primary />{' '}
      </div>
    </form>
  )
}
