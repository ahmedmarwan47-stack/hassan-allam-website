import { Reveal } from "@/components/Reveal";

export default function CeoQuote() {
  return (
    <section
      data-nav-theme="light"
      className="flex justify-center bg-brand-white px-6 py-16 text-brand-black md:px-16 md:py-28"
    >
      <Reveal className="flex max-w-[1144px] flex-col gap-16 text-center md:gap-20">
        <p className="font-serif text-2xl leading-[1.2] tracking-[-0.02em] text-brand-black md:text-[3.875rem]">
          &ldquo;There is no greater pleasure than crafting family-centric
          communities where harmony and exclusivity translate into everyday
          life.&rdquo;
        </p>
        <div className="grid gap-8 font-sans text-base leading-[1.4] text-brand-black md:grid-cols-2 md:gap-16 md:text-left">
          <p>
            For three consecutive generations, Hassan Allam&rsquo;s family
            attained a proud heritage in crafting exclusive communities where
            families come together to enjoy the finest luxuries of life.
            Starting from lifetime unions to new births, our handpicked
            communities exclusively grow in prime locations, welcoming
            lasting friendships.
          </p>
          <p>
            The family-like ties and hassle-free lifestyles that bind them
            together add a whole new dimension, not only to the value of our
            lifetime properties, but also to the true essence of life.
            Welcome to Hassan Allam&rsquo;s circle of trust, where
            exclusivity, charm and harmony are synonymous with everyday life.
          </p>
        </div>
        <p className="font-sans text-base font-medium text-brand-black md:text-left">
          Mohamed Allam — CEO
        </p>
      </Reveal>
    </section>
  );
}
