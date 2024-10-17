import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

const CreatePage = () => {
  return (
    <div>
      <div className="w-full w-screen p-8 flex flex-col gap-4">
        <div className="flex flex-row gap-2 items-center">
          <Input placeholder="Type anything you can imagine" className="w-full" />
          <div className="w-48">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Flux 1">Flux 1</SelectItem>
                <SelectItem value="Flux 2">Flux 2</SelectItem>
                <SelectItem value="Flux 3">Flux 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-48">Generate</Button>
        </div>
        <div className="w-full h-full grid grid-cols-3 gap-4">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <div key={i} className="flex items-center justify-center w-full h-96 bg-stone-900 rounded-sm">
                Item
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CreatePage;