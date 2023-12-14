import { ProfileForm } from "@/components/Forms/profile-form";
import { Separator } from "@/components/ui/separator";

const Page = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is your profile data.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  );
};

export default Page;
