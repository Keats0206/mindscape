import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default async function Profile() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/signin");
  }

  // Fetch the user's subscription information
  const { data: subscription, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching subscription:', error);
  }

  const planName = subscription?.plan_name || 'Free';

  return (
    <div className="flex-1 w-full flex flex-col items-center gap-12 max-w-3xl mx-auto">
      <Avatar className="w-24 h-24">
        <AvatarImage src={user.email} />
        <AvatarFallback>
          {user.email?.slice(0,1).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-medium">{user.email}</h1>
        <p className="text-sm text-foreground/60">{user.email}</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-xl font-medium">Subscription</h2>
        <p className="text-sm text-foreground/60">
          {planName}  
          </p>
          <Link href="/pricing">  
            <Button variant={"outline"}>Upgrade Your Plan</Button>
          </Link>
        <div className="absolute bottom-4 flex flex-col gap-2">
          <Link href="genspo.com/terms-ofservice" className="text-sm text-foreground/60 hover:underline">Terms of Service</Link>
        </div>
      </div>
    </div>
  );
}