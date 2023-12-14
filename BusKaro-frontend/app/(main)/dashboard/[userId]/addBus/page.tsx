import { AddBusForm } from '@/components/Forms/addbus-form'
import { Separator } from '@/components/ui/separator'

const Page = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Add Bus</h3>
        <p className="text-sm text-muted-foreground">
          You can add bus here.
        </p>
      </div>
      <Separator />
      <AddBusForm />
    </div>
  )
}

export default Page