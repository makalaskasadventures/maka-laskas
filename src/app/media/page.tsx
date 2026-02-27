"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

type Block = { id: string; type: string; props: Record<string, any> };
type SectionKey = "newsletter" | "stories";

interface MediaEntry {
  id: string;
  key: SectionKey;
  title: string;
  thumbnail?: string | null;
  content: { blocks: Block[] };
  publishedAt?: string | null;
  updatedAt: string;
}

export default function MediaPage() {
  const [active, setActive] = useState<SectionKey>("stories");
  const [entries, setEntries] = useState<MediaEntry[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const tabs: { key: SectionKey; label: string }[] = [
    { key: "newsletter", label: "Newsletter" },
    { key: "stories", label: "Travel Stories" },
  ];

  useEffect(() => {
    setLoading(true);
    setCurrentIndex(0);
    fetch(`/api/media/${active}?limit=50`)
      .then((res) => res.json())
      .then((data) => {
        setEntries(data?.data || []);
      })
      .catch(() => setEntries([]))
      .finally(() => setLoading(false));
  }, [active]);

  const currentEntry = entries[currentIndex];
  const previousEntries = useMemo(
    () => entries.filter((_, idx) => idx !== currentIndex).slice(0, 4),
    [entries, currentIndex]
  );

  return (
    <main className="min-h-screen">
      <section className="relative h-56 bg-gradient-to-br from-orange-600 to-red-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 container-custom h-full flex items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">Media</h1>
            <p className="text-white/90">Travel stories and newsletters from Maka-Laskas.</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3 lg:sticky lg:top-28 h-max">
            <nav className="space-y-2">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActive(t.key)}
                  className={`w-full text-left px-4 py-3 rounded-lg border flex items-center justify-between ${
                    active === t.key
                      ? "bg-orange-600 text-white border-orange-600"
                      : "bg-white text-gray-800 border-gray-200 hover:bg-orange-50"
                  }`}
                >
                  <span>{t.label}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ))}
            </nav>
          </aside>

          <div className="lg:col-span-6">
            {loading ? (
              <div className="h-96 flex items-center justify-center border border-dashed border-gray-200 rounded-xl">
                <div className="w-10 h-10 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : !currentEntry ? (
              <div className="p-6 border border-gray-200 rounded-xl text-gray-600">No publications yet.</div>
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-sm text-gray-500">
                    {currentEntry.publishedAt
                      ? new Date(currentEntry.publishedAt).toLocaleDateString()
                      : `Updated ${new Date(currentEntry.updatedAt).toLocaleDateString()}`}
                  </p>
                  <h2 className="text-3xl font-bold text-gray-900 mt-2">{currentEntry.title}</h2>
                </div>
                <div className="space-y-6">
                  {(currentEntry.content?.blocks || []).map((block) => (
                    <BlockRenderer key={block.id} block={block} />
                  ))}
                </div>
                {entries.length > 1 && (
                  <div className="mt-8 flex items-center justify-between">
                    <button
                      className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                      onClick={() => setCurrentIndex((idx) => Math.max(0, idx - 1))}
                      disabled={currentIndex === 0}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </button>
                    <span className="text-sm text-gray-500">
                      {currentIndex + 1} / {entries.length}
                    </span>
                    <button
                      className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                      onClick={() => setCurrentIndex((idx) => Math.min(entries.length - 1, idx + 1))}
                      disabled={currentIndex === entries.length - 1}
                    >
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent {active === "stories" ? "Stories" : "Issues"}
              </h3>
              <span className="text-sm text-gray-500">Latest first</span>
            </div>
            {previousEntries.length === 0 ? (
              <p className="text-sm text-gray-500">More publications will appear here.</p>
            ) : (
              <div className="space-y-4">
                {previousEntries.map((entry) => {
                  const idx = entries.findIndex((e) => e.id === entry.id);
                  const thumb = entry.thumbnail || extractFirstImage(entry.content?.blocks || []);
                  return (
                    <button
                      key={entry.id}
                      onClick={() => setCurrentIndex(idx)}
                      className="w-full text-left flex gap-3 p-3 border border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-colors"
                    >
                      <div className="w-20 h-16 rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center">
                        {thumb ? (
                          <img src={thumb} alt={entry.title} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xs text-gray-400">No Image</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 line-clamp-2">{entry.title}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {entry.publishedAt
                            ? new Date(entry.publishedAt).toLocaleDateString()
                            : new Date(entry.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function extractFirstImage(blocks: Block[]): string | null {
  for (const block of blocks) {
    if (block.type === "image" && block.props?.src) return block.props.src;
    if (block.type === "hero" && block.props?.image) return block.props.image;
    if (Array.isArray(block.props?.items)) {
      const nested = extractFirstImage(block.props.items as Block[]);
      if (nested) return nested;
    }
  }
  return null;
}

function getVideoEmbedUrl(url: string): string | null {
  if (!url) return null;
  const youtubeRegex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const youtubeMatch = url.match(youtubeRegex);
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
  }
  const vimeoRegex = /vimeo\.com\/(?:video\/)?(\d+)/;
  const vimeoMatch = url.match(vimeoRegex);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }
  if (url.includes("/embed/") || url.includes("player.vimeo.com")) {
    return url;
  }
  return null;
}

function styleObjectToCss(style: any = {}): React.CSSProperties {
  const css: React.CSSProperties = {};
  if (style.fontFamily) css.fontFamily = style.fontFamily;
  if (style.fontSize) css.fontSize = `${style.fontSize}px`;
  if (style.fontWeight) css.fontWeight = style.fontWeight;
  if (style.color) css.color = style.color;
  if (style.lineHeight) css.lineHeight = style.lineHeight;
  if (style.textAlign) css.textAlign = style.textAlign as any;
  if (style.marginBottom) css.marginBottom = `${style.marginBottom}px`;
  if (style.width) css.width = `${style.width}%`;
  if (style.maxHeight) css.maxHeight = `${style.maxHeight}px`;
  if (style.objectFit) css.objectFit = style.objectFit as any;
  if (style.borderRadius) css.borderRadius = `${style.borderRadius}px`;
  return css;
}

function BlockRenderer({ block }: { block: Block }) {
  const { type, props } = block;
  const customStyle = styleObjectToCss(props.style);

  if (type === "heading") {
    const level = Math.min(Math.max(Number(props.level) || 2, 1), 4);
    const Tag = (`h${level}` as unknown) as any;
    return (
      <Tag className="text-gray-900 font-bold text-2xl" style={customStyle}>
        {props.text}
      </Tag>
    );
  }
  if (type === "text") {
    return (
      <p className="text-gray-700 leading-relaxed" style={customStyle}>
        {props.text}
      </p>
    );
  }
  if (type === "image") {
    return (
      <figure>
        {props.src ? (
          <img
            src={props.src}
            alt={props.alt || ""}
            className="w-full rounded-xl"
            style={{
              ...customStyle,
              objectFit: customStyle.objectFit || "cover",
            }}
          />
        ) : (
          <div className="w-full h-48 bg-gray-100 rounded-xl" />
        )}
        {props.caption && <figcaption className="text-sm text-gray-500 mt-2">{props.caption}</figcaption>}
      </figure>
    );
  }
  if (type === "video") {
    const embedUrl = getVideoEmbedUrl(props.url);
    return (
      <div className="aspect-video w-full bg-black/5 rounded-xl overflow-hidden">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={props.title || "Video"}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-gray-500">Video unavailable</p>
          </div>
        )}
      </div>
    );
  }
  if (type === "button") {
    return (
      <a
        href={props.href || "#"}
        className="inline-block btn-primary"
        target={props.openInNewTab ? "_blank" : "_self"}
        rel={props.openInNewTab ? "noopener noreferrer" : undefined}
      >
        {props.label || "Learn More"}
        {props.openInNewTab && <span className="ml-2 text-xs">↗</span>}
      </a>
    );
  }
  if (type === "hero") {
    const heroLayout = props.layout || "image-right";
    const titleStyle = styleObjectToCss(props.titleStyle || {});
    const contentStyle = styleObjectToCss(props.contentStyle || {});
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-8">
        {heroLayout === "image-left" && props.image && (
          <div className="order-1 md:order-1">
            <img src={props.image} alt={props.imageAlt || ""} className="w-full h-80 object-cover rounded-xl" />
          </div>
        )}
        <div className={heroLayout === "image-left" ? "order-2 md:order-2" : "order-1 md:order-1"}>
          <h2 className="text-4xl font-bold text-gray-900 mb-4" style={titleStyle}>
            {props.title || "Hero Title"}
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg" style={contentStyle}>
            {props.content || "Hero content text goes here."}
          </p>
        </div>
        {heroLayout === "image-right" && props.image && (
          <div className="order-2 md:order-2">
            <img src={props.image} alt={props.imageAlt || ""} className="w-full h-80 object-cover rounded-xl" />
          </div>
        )}
      </div>
    );
  }
  if (type === "cardGrid") {
    const items: any[] = Array.isArray(props.items) ? props.items : [];
    const columns = props.columns || 3;
    const alignment = props.alignment || "start";
    const gridColsClass =
      columns === 1
        ? "grid-cols-1"
        : columns === 2
        ? "grid-cols-1 md:grid-cols-2"
        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    const justifyClass =
      alignment === "center"
        ? "justify-items-center"
        : alignment === "end"
        ? "justify-items-end"
        : "justify-items-start";
    return (
      <div className={`grid ${gridColsClass} ${justifyClass} gap-6`}>
        {items.map((it, i) => (
          <article key={i} className="p-6 border border-gray-200 rounded-xl w-full">
            {it.image && <img src={it.image} alt={it.title || ""} className="w-full h-40 object-cover rounded-lg mb-3" />}
            <h3 className="font-semibold text-gray-900">{it.title || "Untitled"}</h3>
            {it.snippet && <p className="text-gray-600 text-sm mt-1">{it.snippet}</p>}
            {it.href && (
              <a href={it.href} className="text-orange-600 text-sm mt-2 inline-block">
                Read More
              </a>
            )}
          </article>
        ))}
      </div>
    );
  }
  if (type === "timeline") {
    const items: any[] = Array.isArray(props.items) ? props.items : [];
    return (
      <ol className="relative border-l border-gray-200 ml-2 pl-6">
        {items.map((it, i) => (
          <li key={i} className="mb-6">
            <div className="absolute -left-2.5 w-5 h-5 bg-orange-600 rounded-full border-2 border-white" />
            <h4 className="font-semibold text-gray-900">{it.title || "Event"}</h4>
            {it.date && <div className="text-xs text-gray-500">{it.date}</div>}
            {it.text && <p className="text-gray-700 mt-1">{it.text}</p>}
          </li>
        ))}
      </ol>
    );
  }
  if (type === "newsletter") {
    return (
      <div className="p-6 border border-gray-200 rounded-xl">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{props.heading || "Subscribe"}</h3>
        {props.subtext && <p className="text-gray-600 mb-4">{props.subtext}</p>}
        <div className="flex">
          <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-l-lg border border-gray-300" />
          <button className="px-6 py-3 bg-orange-600 text-white rounded-r-lg">Subscribe</button>
        </div>
      </div>
    );
  }
  return null;
}















