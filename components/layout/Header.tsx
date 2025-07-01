import { ThemeToggle } from "../theme-toggle"

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
      <h1 className="text-xl sm:text-2xl font-bold">{title}</h1>
      <ThemeToggle />
    </div>
  )
}
