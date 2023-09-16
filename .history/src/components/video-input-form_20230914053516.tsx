
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

  async function convertVideoToAudio(video: File) {
    console.log('Convert started.')

    const ffmpeg = await getFFmpeg()

    await ffmpeg.writeFile('input.mp4', await fetchFile(video))

    // ffmpeg.on('log', log => {
    //   console.log(log)
    // })

    ffmpeg.on('progress', progress => {
      console.log('Convert progress: ' + Math.round(progress.progress * 100))
    })

    await ffmpeg.exec([
      '-i',
      'input.mp4',
      '-map',
      '0:a',
      '-b:a',
      '20k',
      '-acodec',
      'libmp3lame',
      'output.mp3'
    ])

    const data = await ffmpeg.readFile('output.mp3')

    const audioFileBlob = new Blob([data], { type: 'audio/mp3' })
    const audioFile = new File([audioFileBlob], 'output.mp3', {
      type: 'audio/mpeg'
    })

    console.log('Convert finished.')

    return audioFile
  }
  
  async function handleUploadVideo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const prompt = promptInputRef.current?.value

    if (!videoFile) {
      return
    }

    //Converter o vídeo em áudio sera usao o nabegador do proprio usuário



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
