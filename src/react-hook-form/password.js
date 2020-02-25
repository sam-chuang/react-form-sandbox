import React, { forwardRef } from "react"
import { useForm } from "react-hook-form"
import { Input, Button, FormControl, FormLabel } from "@chakra-ui/core"
import {
  useTooltipState,
  Tooltip,
  TooltipArrow,
  TooltipReference
} from "reakit/Tooltip"
import { Box } from "reakit/Box"
import { useDialogState, Dialog, DialogBackdrop } from "reakit/Dialog"

const Password = "password"

const PasswordForm = () => {
  const form = useForm({})
  const { register, handleSubmit, formState, getValues, watch, errors } = form
  const dialog = useDialogState()

  return (
    <Box>
      <form
        onSubmit={handleSubmit(data => {
          dialog.show()
        })}
      >
        <InputExt
          label="Name"
          name="name"
          autoComplete="off"
          ref={register({
            required: "Name is required"
          })}
          formErrors={errors}
          formState={formState}
        />
        <InputExt
          label="Password"
          name={Password}
          autoComplete="off"
          ref={register({ required: "Password is required." })}
          formErrors={errors}
          formState={formState}
        />
        <InputExt
          label="Confirm Password"
          name="passwordAgain"
          autoComplete="off"
          ref={register({
            required: "Confirm password required.",
            validate: {
              matchPassword: value => {
                let match = value === watch(Password)
                return match ? true : "Password not match"
              }
            }
          })}
          formErrors={errors}
          formState={formState}
        />
        <Button type="submit">Submit</Button>
      </form>
      <DialogBackdrop {...dialog}>
        <Dialog {...dialog}>{JSON.stringify(getValues())}</Dialog>
      </DialogBackdrop>
    </Box>
  )
}

const InputExt = forwardRef(
  ({ label, formState = {}, formErrors = {}, ...props } = {}, ref) => {
    const errorTooltip = useTooltipState({
      placement: "auto"
    })
    const { id, name } = props
    let isDirty = formState?.dirtyFields?.has(name)
    let isTouched = formState?.touched?.[name]
    let error = formErrors?.[name]
    let hasErrorFocus = document.activeElement === error?.ref
    let showErrorMessage = Boolean(hasErrorFocus && error?.message)

    // Experimental/unstable method that updates tooltip's dimensions when
    // the error message changes
    React.useEffect(() => {
      errorTooltip.unstable_update()
    }, [error?.message, errorTooltip.unstable_update])

    // Hijacks tooltip.visible so it'll only be visible when showErrorMessage
    // is truthy
    React.useEffect(() => {
      if (showErrorMessage) {
        errorTooltip.show()
      } else {
        errorTooltip.hide()
      }
    }, [
      showErrorMessage,
      errorTooltip.visible,
      errorTooltip.show,
      errorTooltip.hide
    ])

    return (
      <FormControl>
        <FormLabel htmlFor={id ?? name}>{label}</FormLabel>
        <TooltipReference {...errorTooltip} as={Input} {...props} ref={ref} />
        <Tooltip {...errorTooltip}>
          <TooltipArrow {...errorTooltip} />
          {error?.message}
        </Tooltip>
      </FormControl>
    )
  }
)

export default PasswordForm
