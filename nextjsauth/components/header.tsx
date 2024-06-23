import { MainNav } from "./main-nav"
import { DescriptionUpdate } from "./update-description"
import UserButton from "./user-button"

export default function Header() {
  return (
    <header className="sticky flex justify-center border-b bg-neutral-900">
      <div className="flex items-center justify-between w-full h-16 max-w-3xl px-4 mx-auto sm:px-6">
        {/* <MainNav /> */}
        <DescriptionUpdate/>
        <UserButton />
      </div>
    </header>
  )
}
