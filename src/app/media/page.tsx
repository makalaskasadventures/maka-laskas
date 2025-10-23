"use client";

import { useEffect, useMemo, useState } from 'react';
import { ChevronRight } from 'lucide-react';

type Block = { id: string; type: string; props: Record<string, any> };
type SectionKey = 'newsletter' | 'stories' | 'awards' | 'keynotes' | 'kit';

export default function MediaPage() {
  const [active, setActive] = useState<SectionKey>('stories');
  const [title, setTitle] = useState<string>('');
  const [itemsPerPage, setItemsPerPage] = useState<number>(9);
  const [isPaginated, setIsPaginated] = useState<boolean>(true);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [page, setPage] = useState<number>(1);

  const tabs: { key: SectionKey; label: string }[] = [
    { key: 'newsletter', label: 'Newsletter' },
    { key: 'stories', label: 'Travel Stories' },
    { key: 'awards', label: 'Awards' },
    { key: 'keynotes', label: 'Keynotes' },
    { key: 'kit', label: 'Media Kit' },
  ];

  useEffect(() => {
    setPage(1);
    fetch(`/api/media/${active}`)
      .then((r) => r.json())
      .then((res) => {
        if (res?.data) {
          setTitle(res.data.title ?? '');
          setItemsPerPage(res.data.itemsPerPage ?? 9);
          setIsPaginated(res.data.isPaginated ?? true);
          setBlocks(res.data.content?.blocks ?? []);
        } else {
          setTitle('');
          setItemsPerPage(9);
          setIsPaginated(true);
          setBlocks([]);
        }
      });
  }, [active]);

  const pagedBlocks = useMemo(() => {
    if (!isPaginated || active === 'kit') return blocks;
    const start = (page - 1) * itemsPerPage;
    return blocks.slice(start, start + itemsPerPage);
  }, [blocks, page, itemsPerPage, isPaginated, active]);

  const totalPages = useMemo(() => {
    if (!isPaginated || active === 'kit') return 1;
    return Math.max(1, Math.ceil(blocks.length / itemsPerPage));
  }, [blocks.length, itemsPerPage, isPaginated, active]);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative h-56 bg-gradient-to-br from-orange-600 to-red-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 container-custom h-full flex items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">Media</h1>
            <p className="text-white/90">Stories, awards, keynotes, newsletters, and our media kit.</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-3 lg:sticky lg:top-28 h-max">
            <nav className="space-y-2">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActive(t.key)}
                  className={`w-full text-left px-4 py-3 rounded-lg border flex items-center justify-between ${active === t.key ? 'bg-orange-600 text-white border-orange-600' : 'bg-white text-gray-800 border-gray-200 hover:bg-orange-50'}`}
                >
                  <span>{t.label}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className="lg:col-span-9">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{title || tabs.find((t) => t.key === active)?.label}</h2>
            </div>

            {/* Render from JSON blocks */}
            <div className="space-y-6">
              {pagedBlocks.length === 0 && (
                <div className="p-6 border border-gray-200 rounded-xl text-gray-600">No content yet.</div>
              )}
              {pagedBlocks.map((b) => (
                <BlockRenderer key={b.id} block={b} />
              ))}
            </div>

            {/* Pagination */}
            {isPaginated && active !== 'kit' && totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  className="px-3 py-2 rounded border border-gray-200 hover:bg-gray-50"
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-10 h-10 rounded border ${page === i + 1 ? 'bg-orange-600 text-white border-orange-600' : 'border-gray-200 hover:bg-orange-50'}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="px-3 py-2 rounded border border-gray-200 hover:bg-gray-50"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

// Helper function to convert YouTube/Vimeo URLs to embed URLs
function getVideoEmbedUrl(url: string): string | null {
  if (!url) return null;
  
  // YouTube
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const youtubeMatch = url.match(youtubeRegex);
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
  }
  
  // Vimeo
  const vimeoRegex = /vimeo\.com\/(?:video\/)?(\d+)/;
  const vimeoMatch = url.match(vimeoRegex);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }
  
  // If already an embed URL, return as is
  if (url.includes('/embed/') || url.includes('player.vimeo.com')) {
    return url;
  }
  
  return null;
}

// Helper function to convert style object to CSS
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
  
  if (type === 'heading') {
    const level = Math.min(Math.max(Number(props.level) || 2, 1), 4);
    const Tag = (`h${level}` as unknown) as any;
    return <Tag className="text-gray-900 font-bold text-2xl" style={customStyle}>{props.text}</Tag>;
  }
  if (type === 'text') {
    return <p className="text-gray-700 leading-relaxed" style={customStyle}>{props.text}</p>;
  }
  if (type === 'image') {
    return (
      <figure>
        {props.src ? (
          <img 
            src={props.src} 
            alt={props.alt || ''} 
            className="w-full rounded-xl" 
            style={{
              ...customStyle,
              objectFit: customStyle.objectFit || 'cover'
            }}
          />
        ) : (
          <div className="w-full h-48 bg-gray-100 rounded-xl" />
        )}
        {props.caption && <figcaption className="text-sm text-gray-500 mt-2">{props.caption}</figcaption>}
      </figure>
    );
  }
  if (type === 'video') {
    const embedUrl = getVideoEmbedUrl(props.url);
    return (
      <div className="aspect-video w-full bg-black/5 rounded-xl overflow-hidden">
        {embedUrl ? (
          <iframe 
            src={embedUrl} 
            className="w-full h-full" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={props.title || 'Video'}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-gray-500">Video unavailable</p>
          </div>
        )}
      </div>
    );
  }
  if (type === 'button') {
    return (
      <a 
        href={props.href || '#'} 
        className="inline-block btn-primary"
        target={props.openInNewTab ? '_blank' : '_self'}
        rel={props.openInNewTab ? 'noopener noreferrer' : undefined}
      >
        {props.label || 'Learn More'}
        {props.openInNewTab && <span className="ml-2 text-xs">↗</span>}
      </a>
    );
  }
  if (type === 'hero') {
    const heroLayout = props.layout || 'image-right';
    const titleStyle = styleObjectToCss(props.titleStyle || {});
    const contentStyle = styleObjectToCss(props.contentStyle || {});
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-8">
        {heroLayout === 'image-left' && props.image && (
          <div className="order-1 md:order-1">
            <img 
              src={props.image} 
              alt={props.imageAlt || ''} 
              className="w-full h-80 object-cover rounded-xl"
            />
          </div>
        )}
        <div className={heroLayout === 'image-left' ? 'order-2 md:order-2' : 'order-1 md:order-1'}>
          <h2 
            className="text-4xl font-bold text-gray-900 mb-4" 
            style={titleStyle}
          >
            {props.title || 'Hero Title'}
          </h2>
          <p 
            className="text-gray-700 leading-relaxed text-lg"
            style={contentStyle}
          >
            {props.content || 'Hero content text goes here.'}
          </p>
        </div>
        {heroLayout === 'image-right' && props.image && (
          <div className="order-2 md:order-2">
            <img 
              src={props.image} 
              alt={props.imageAlt || ''} 
              className="w-full h-80 object-cover rounded-xl"
            />
          </div>
        )}
      </div>
    );
  }
  if (type === 'cardGrid') {
    const items: any[] = Array.isArray(props.items) ? props.items : [];
    const columns = props.columns || 3;
    const alignment = props.alignment || 'start';
    const gridColsClass = columns === 1 ? 'grid-cols-1' : columns === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    const justifyClass = alignment === 'center' ? 'justify-items-center' : alignment === 'end' ? 'justify-items-end' : 'justify-items-start';
    
    return (
      <div className={`grid ${gridColsClass} ${justifyClass} gap-6`}>
        {items.map((it, i) => (
          <article key={i} className="p-6 border border-gray-200 rounded-xl w-full">
            {it.image && <img src={it.image} alt={it.title || ''} className="w-full h-40 object-cover rounded-lg mb-3" />}
            <h3 className="font-semibold text-gray-900">{it.title || 'Untitled'}</h3>
            {it.snippet && <p className="text-gray-600 text-sm mt-1">{it.snippet}</p>}
            {it.href && <a href={it.href} className="text-orange-600 text-sm mt-2 inline-block">Read More</a>}
          </article>
        ))}
      </div>
    );
  }
  if (type === 'timeline') {
    const items: any[] = Array.isArray(props.items) ? props.items : [];
    return (
      <ol className="relative border-l border-gray-200 ml-2 pl-6">
        {items.map((it, i) => (
          <li key={i} className="mb-6">
            <div className="absolute -left-2.5 w-5 h-5 bg-orange-600 rounded-full border-2 border-white" />
            <h4 className="font-semibold text-gray-900">{it.title || 'Event'}</h4>
            {it.date && <div className="text-xs text-gray-500">{it.date}</div>}
            {it.text && <p className="text-gray-700 mt-1">{it.text}</p>}
          </li>
        ))}
      </ol>
    );
  }
  if (type === 'newsletter') {
    return (
      <div className="p-6 border border-gray-200 rounded-xl">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{props.heading || 'Subscribe'}</h3>
        {props.subtext && <p className="text-gray-600 mb-4">{props.subtext}</p>}
        <div className="flex">
          <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-l-lg border border-gray-300" />
          <button className="px-6 py-3 bg-orange-600 text-white rounded-r-lg">Subscribe</button>
        </div>
      </div>
    );
  }
  if (type === 'mediaKit') {
    return (
      <div className="p-6 border border-gray-200 rounded-xl">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Media Kit</h3>
        <a href={props.href || '#'} className="btn-primary inline-block">{props.label || 'Download Media Kit'}</a>
      </div>
    );
  }
  return null;
}
