/**
 * ImagePlaceholder — Cream/ivory editorial placeholder for missing image assets.
 * Designed to match the NATYA AI warm minimal theme.
 * Preserves intended dimensions/aspect ratio for future image replacement.
 */

interface ImagePlaceholderProps {
    /** Aspect ratio class, e.g. 'aspect-[4/3]' or 'aspect-square' */
    aspectRatio?: string;
    /** Label shown on the placeholder */
    label?: string;
    className?: string;
}

export function ImagePlaceholder({
    aspectRatio = 'aspect-[4/3]',
    label = 'Visual coming soon',
    className = '',
}: ImagePlaceholderProps) {
    return (
        <div
            className={`${aspectRatio} w-full bg-[#FAF5EE] border border-dashed border-[#D4C9BC] rounded-[8px] flex flex-col items-center justify-center gap-2 ${className}`}
            aria-label={label}
            role="img"
        >
            {/* Simple diamond ornament */}
            <div className="w-5 h-5 border border-[#C4B5A5] rotate-45 mb-1 opacity-60" />
            <span className="text-[10px] uppercase tracking-[0.18em] text-[#B0A090] font-semibold font-sans">
                {label}
            </span>
        </div>
    );
}
