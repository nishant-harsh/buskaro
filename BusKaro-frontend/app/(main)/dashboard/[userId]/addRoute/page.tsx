import { AddRouteForm } from '@/components/Forms/addRoute-form'
import { Separator } from '@/components/ui/separator'

const Page = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Add Bus Route</h3>
        <p className="text-sm text-muted-foreground">
          You can add bus route here.
        </p>
      </div>
      <Separator />
      <AddRouteForm />
    </div>
  )
}

export default Page