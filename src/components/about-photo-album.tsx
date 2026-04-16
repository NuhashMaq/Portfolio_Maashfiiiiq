import Image from 'next/image';

type AboutPhotoAlbumProps = {
  compact?: boolean;
};

export default function AboutPhotoAlbum({ compact = false }: AboutPhotoAlbumProps) {
  return (
    <section className="rounded-3xl border border-slate-300/70 bg-gradient-to-br from-white/90 via-slate-50/80 to-white/75 p-3 shadow-[0_12px_38px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-white/12 dark:from-zinc-900/65 dark:via-black/55 dark:to-zinc-950/70">
      <div className="mb-3 px-1">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Mashfiq in Frames
        </h3>
      </div>

      <div className={`grid gap-2 ${compact ? 'grid-cols-2' : 'grid-cols-6'}`}>
        <div className={`${compact ? 'col-span-1' : 'col-span-4'} relative overflow-hidden rounded-2xl border border-slate-300/75 bg-white/70 dark:border-white/12 dark:bg-white/5`}>
          <Image
            src="/ProfilePic1.jpg"
            alt="Mashfiq portrait"
            width={1200}
            height={1200}
            className={`h-full w-full object-cover ${compact ? 'aspect-square' : 'aspect-[16/10]'} scale-[1.02]`}
            priority={false}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
        </div>

        <div className={`${compact ? 'col-span-1' : 'col-span-2'} grid gap-2`}>
          <div className="rounded-2xl border border-slate-300/80 bg-white/80 px-3 py-2 text-[11px] leading-relaxed text-slate-700 dark:border-white/15 dark:bg-white/10 dark:text-slate-200">
            <p className="font-semibold">Current Education</p>
            <p className="mt-0.5">B.E. in CSE, RUET</p>
          </div>

          <div className="rounded-2xl border border-slate-300/80 bg-white/80 px-3 py-2 text-[11px] leading-relaxed text-slate-700 dark:border-white/15 dark:bg-white/10 dark:text-slate-200">
            <p><span className="font-semibold">Age:</span> 23</p>
            <p><span className="font-semibold">Hobbies:</span> Books, Films, Geopolitics and Travelling.</p>
          </div>

          <div className="rounded-2xl border border-slate-300/80 bg-white/80 px-3 py-2 text-[11px] leading-relaxed text-slate-700 dark:border-white/15 dark:bg-white/10 dark:text-slate-200">
            <p className="font-semibold">Stoic Eclecticist</p>
            <p className="mt-0.5 italic">"He who has a why to live can bear almost any how."<br />- Friedrich Nietzsche</p>
          </div>
        </div>
      </div>
    </section>
  );
}
