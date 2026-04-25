import Image from "next/image";

type AvatarProps = {
  className?: string;
  sizes: string;
  priority?: boolean;
  alt?: string;
};

/**
 * Circular profile photo with a polished shadow stack:
 *  - outer drop shadow + halo on the wrapper
 *  - top inner highlight + 1px inner ring on a pointer-events-none overlay
 *    rendered ON TOP of the image so the highlights don't get hidden
 *    underneath it (which is what happens if you put inset shadows on the
 *    same element as a child <img>).
 */
export function Avatar({
  className,
  sizes,
  priority = false,
  alt = "",
}: AvatarProps) {
  return (
    <div
      className={`relative shrink-0 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.4),0_4px_12px_rgba(0,0,0,0.2)] ${className ?? ""}`}
    >
      <div className="absolute inset-0 overflow-hidden rounded-full">
        <Image
          src="/retouched.webp"
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
          priority={priority}
        />
      </div>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18),inset_0_1px_0_rgba(255,255,255,0.30)]"
      />
    </div>
  );
}
