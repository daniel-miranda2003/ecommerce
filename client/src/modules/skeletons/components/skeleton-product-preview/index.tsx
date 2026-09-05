import { Container } from "@modules/common/components/ui"

const SkeletonProductPreview = () => {
  return (
    <div className="animate-pulse">
      <Container className="aspect-[9/16] w-full bg-[#EFEEEA] bg-paper-warm" />
      <div className="flex justify-between text-base-regular mt-2">
        <div className="w-2/5 h-6 bg-[#EFEEEA]"></div>
        <div className="w-1/5 h-6 bg-[#EFEEEA]"></div>
      </div>
    </div>
  )
}

export default SkeletonProductPreview
