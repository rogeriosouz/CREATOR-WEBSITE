import { AspectRatio } from '@/components/ui/aspect-ratio'
import aboutPhoto from '@/assets/images/about-section-photo.png'

export function About() {
  return (
    <section className="w-full px-32 mb-32 py-20 relative md:px-10 sm:px-5">
      <div className="rounded z-[999] overflow-hidden box-shadow-card md:w-full max-w-[1300px] mx-auto">
        <AspectRatio ratio={16 / 9}>
          <img
            src={aboutPhoto}
            className="w-full h-full"
            alt="image hero section"
          />
        </AspectRatio>
      </div>
    </section>
  )
}
