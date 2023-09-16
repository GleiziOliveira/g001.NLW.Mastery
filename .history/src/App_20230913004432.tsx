import { FileVideo, Github } from "lucide-react"
import { Button } from "./components/ui/button"
import { Separator } from "./components/ui/separator"
import { Textarea } from "./components/ui/textarea"
import { Label } from "./components/ui/Label"

export function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-6 py-3 flex items-center justify-between border-b">
        {/*px p= padding e x = eixo horizontal e o número vale lembrar que sempre é x4 ou seja o 6 é = a 24px py = padding vertical sendo 12px  */}
        <h1 className="text-xl font-bold">upload.ia</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Desenvolvido com ❤ na NLW da Rocketseat
          </span>

          <Separator orientation="vertical" className="h-6" />

          <Button variant="outline">
            <Github className="w-4 h-4 mr-2" />{" "}
            {/* w=widht e h= height (altura e largura) */}
            Github
          </Button>
        </div>
      </div>

      <main className="flex-1 p-6 flex gap-6">
        <div className="flex flex-col flex-1 gap-4">
          <div className="grid grid-rows-2 gap-4 flex-1">
            <Textarea
              className="resize-none p-4 leading-relaxed"
              placeholder="Inclua o prompt para a IA..."
            />

            <Textarea
              className="resize-none p-4 leading-relaxed"
              placeholder="Resultado gerado pela IA..."
              readOnly
            />
          </div>

          <p className="text-sm text-muted-foreground">
            Lembre-se: Você pode utilizar a variável
            <code className="text-pink-400"> {"{transcription}"} </code> no seu
            prompt para adicionar o conteúdo do vídeo selecionado.
          </p>
        </div>

        <aside className="w-80 space-y-6">
          {" "}
          {/* space-y-6 vai colocar um espaçamento de 24px entre cada tag e tem que estar com display block para funcionar */}
          <form className="space-y-6">
            <label
              htmlFor="video"
              className="border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary"
            >
              <FileVideo className="w-4 h-4" />
              Selecione um Video
            </label>

            <input
              type="file"
              id="video"
              accept="video/mp4"
              className="sr-only"
            />
            {/* o sr-only remove visualmente o input por=ém ele continua na DOM*/}

            <Separator/>

            <div className="space-y-1">
              <Label htmlFor="transcription_prompt">Prompt de Transcrição </Label>
              <Textarea 
              id="transcription_prompt" 
              className="min-h-20 leading-relaxed" 
              placeholder="In"
              />
            </div>
          </form>
        </aside>
      </main>
    </div>
  )
}
