import { MemeDetails } from "@/components/meme-details"

interface MemePageProps {
  params: {
    id: string
  }
}

export default function MemePage({ params }: MemePageProps) {
  return (
    <div className="page-container">
      <MemeDetails id={params.id} />
    </div>
  )
}

