import { signOutAction } from "@/app/actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { DropdownMenuGroup, DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { User, LogOut } from "lucide-react";
import { FeedbackPopover } from "@/components/FeedbackPopover";
 
export default async function AuthButton() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="w-full flex flex-row justify-between items-center gap-2 pl-2">
      <div className="flex flex-row items-center gap-2">
        <div className="flex items-center justify-center">
          {/* <Link href="/explore" className="text-sm font-medium hover:bg-stone-100 rounded-md p-2 transition-all duration-300">
            Explore
          </Link> */}
          <Link href="/create" className="text-sm font-medium hover:bg-stone-100 rounded-md p-2 transition-all duration-300">
            Create
          </Link>
          <Link href="/explore" className="text-sm font-medium hover:bg-stone-100 rounded-md p-2 transition-all duration-300">
            Explore
          </Link>
        </div>
      </div>
      <div className="flex flex-row items-center gap-2">
        <FeedbackPopover userEmail={user.email} />
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"} className="cursor-pointer rounded-full w-10 h-10 flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-80 active:scale-90 transition-all duration-300">
            {user.email?.slice(0,1).toUpperCase()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mr-4">
          <DropdownMenuLabel>
            My Account
            <div className="flex justify-between opacity-50">{user.email}</div>
          </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link href="/profile" className="w-full flex">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                  <form action={signOutAction} className="py-0">
                    <Button type="submit" variant={"ghost"} className="flex items-center justify-center h-5 px-0 py-0 w-full active:bg-transparent active:opacity-80">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </Button>
                  </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
    </div>
  ) : (
    <div>
      <div className="w-full flex gap-2">
        <Button asChild size="sm" variant={"outline"}>
          <Link href="/login">Log in</Link>
        </Button>
        <Button asChild size="sm" variant={"default"}>
          <Link href="/signup">Sign up</Link>
        </Button>
      </div>
    </div>
  );
}
