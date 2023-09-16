
import { FileVideo, Upload } from "lucide-react"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react"


export function VideoInputForm(){
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const promptInputRef = useRef<HTMLTextAreaElement>(null)

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>){
    const { files } = event.currentTarget

    if(!files){
      return
    }

    const selectedFile = files[0]

    setVideoFile(selectedFile)

  }
  
  async function handleUploadVideo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const prompt = promptInputRef.current?.value

    if (!videoFile) {
      return
    }

    //Converter o vídeo em áudio

    const previewURL = useMemo(() => {
      if (!videoFile) {return null
    }
    

    return URL.createObjectURL(videoFile)
  }, [videoFile])
  }
  return (
    <form onSubmit={handleUploadVideo} className="space-y-6">
      <label
        htmlFor="video"
        className="relative border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary"
      >
        {previewURL ? (
          <video src={previewURL}
            controls={false}
            className="pointer-events-none absolute inset-0"
          />
        ) : (
          <>
            <FileVideo className="w-4 h-4" />
            Selecione um Video
          </>
        )}
      </label>

      <input
        type="file"
        id="video"
        accept="video/mp4"
        className="sr-only"
        onChange={handleFileSelected}
      />
      {/* o sr-only remove visualmente o input por=ém ele continua na DOM*/}

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="transcription_prompt">Prompt de Transcrição </Label>
        <Textarea
          ref={promptInputRef}
          id="transcription_prompt"
          className="h-20 leading-relaxed resize-none"
          placeholder="Inclua palavras-chaves mencionadas no vídeo separadas por vírgula (,)"
        />
      </div>

      <Button type="submit" className="w-full">
        Carregar Video
        <Upload className="w-4 h-4 ml-2" />
      </Button>
    </form>
  )
}
