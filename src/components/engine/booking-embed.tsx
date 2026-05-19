interface BookingEmbedProps {
  url: string;
  height?: number;
  title?: string;
}

export function BookingEmbed({
  url,
  height = 600,
  title = "Book a meeting",
}: BookingEmbedProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <iframe
        src={url}
        title={title}
        width="100%"
        height={height}
        className="border-0"
        loading="lazy"
      />
    </div>
  );
}
