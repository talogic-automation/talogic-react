import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from './alert-dialog.component'

function DeleteRecipe ({ onDelete }: { onDelete: () => void }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>Delete recipe</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Delete this recipe?</AlertDialogTitle>
        <AlertDialogDescription>Its runs and records stay. You cannot undo this.</AlertDialogDescription>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction variant='destructive' onClick={onDelete}>Delete</AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  )
}

describe('AlertDialog', () => {
  it('focuses Cancel first, so Enter does not confirm', async () => {
    const onDelete = jest.fn()

    render(<DeleteRecipe onDelete={onDelete} />)
    await userEvent.click(screen.getByRole('button', { name: 'Delete recipe' }))

    expect(screen.getByRole('alertdialog', { name: 'Delete this recipe?' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancel' })).toHaveFocus()

    await userEvent.keyboard('{Enter}')

    expect(onDelete).not.toHaveBeenCalled()
  })

  it('runs the action when the user confirms', async () => {
    const onDelete = jest.fn()

    render(<DeleteRecipe onDelete={onDelete} />)
    await userEvent.click(screen.getByRole('button', { name: 'Delete recipe' }))
    await userEvent.click(screen.getByRole('button', { name: 'Delete' }))

    expect(onDelete).toHaveBeenCalledTimes(1)
  })
})
