'use client';

import { Type, Image, Video, MousePointer, Grid, Clock, Mail, Download, FileText } from 'lucide-react';

interface ElementRendererProps {
  element: any;
  isPreview?: boolean;
  isSelected?: boolean;
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

export default function ElementRenderer({ element, isPreview = false, isSelected = false }: ElementRendererProps) {
  const { type, props } = element;
  const customStyle = styleObjectToCss(props.style);

  const getElementIcon = (type: string) => {
    const icons: Record<string, any> = {
      heading: Type,
      text: Type,
      image: Image,
      video: Video,
      button: MousePointer,
      hero: Grid,
      cardGrid: Grid,
      timeline: Clock,
      newsletter: Mail,
      mediaKit: Download,
      keynotes: Video,
    };
    return icons[type] || FileText;
  };

  const ElementIcon = getElementIcon(type);

  // Render different element types
  switch (type) {
    case 'heading':
      const level = Math.min(Math.max(Number(props.level) || 2, 1), 6);
      const Tag = `h${level}` as keyof JSX.IntrinsicElements;
      return (
        <div className="relative">
          <div className="flex items-center space-x-2 mb-2">
            <ElementIcon className="w-4 h-4 text-gray-500" />
            <span className="text-xs text-gray-500 uppercase tracking-wide">Heading</span>
          </div>
          <Tag 
            className={`text-gray-900 font-bold ${isSelected ? 'ring-2 ring-orange-500 ring-opacity-50' : ''}`}
            style={customStyle}
          >
            {props.text || 'New Heading'}
          </Tag>
        </div>
      );

    case 'text':
      return (
        <div className="relative">
          <div className="flex items-center space-x-2 mb-2">
            <ElementIcon className="w-4 h-4 text-gray-500" />
            <span className="text-xs text-gray-500 uppercase tracking-wide">Text Block</span>
          </div>
          <p 
            className={`text-gray-700 leading-relaxed ${isSelected ? 'ring-2 ring-orange-500 ring-opacity-50' : ''}`}
            style={customStyle}
          >
            {props.text || 'New paragraph text...'}
          </p>
        </div>
      );

    case 'image':
      return (
        <div className="relative">
          <div className="flex items-center space-x-2 mb-2">
            <ElementIcon className="w-4 h-4 text-gray-500" />
            <span className="text-xs text-gray-500 uppercase tracking-wide">Image</span>
          </div>
          <div className={`${isSelected ? 'ring-2 ring-orange-500 ring-opacity-50' : ''}`}>
            {props.src ? (
              <img 
                src={props.src} 
                alt={props.alt || ''} 
                className="w-full rounded-lg border"
                style={{
                  ...customStyle,
                  objectFit: customStyle.objectFit || 'cover',
                  maxHeight: customStyle.maxHeight || '400px'
                }}
              />
            ) : (
              <div className="w-full h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No image selected</p>
                </div>
              </div>
            )}
            {props.caption && (
              <p className="text-sm text-gray-500 mt-2">{props.caption}</p>
            )}
          </div>
        </div>
      );

    case 'video':
      const embedUrl = getVideoEmbedUrl(props.url);
      return (
        <div className="relative">
          <div className="flex items-center space-x-2 mb-2">
            <ElementIcon className="w-4 h-4 text-gray-500" />
            <span className="text-xs text-gray-500 uppercase tracking-wide">Video</span>
          </div>
          <div className={`aspect-video w-full bg-gray-100 rounded-lg overflow-hidden ${isSelected ? 'ring-2 ring-orange-500 ring-opacity-50' : ''}`}>
            {embedUrl ? (
              <iframe 
                src={embedUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={props.title || 'Video'}
              />
            ) : props.url ? (
              <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <Video className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Video: {props.title || 'Untitled'}</p>
                  <p className="text-xs text-gray-400 mt-1">Preview not available</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <Video className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No video URL provided</p>
                </div>
              </div>
            )}
          </div>
          {props.title && (
            <p className="text-sm text-gray-700 mt-2 font-medium">{props.title}</p>
          )}
        </div>
      );

    case 'button':
      return (
        <div className="relative">
          <div className="flex items-center space-x-2 mb-2">
            <ElementIcon className="w-4 h-4 text-gray-500" />
            <span className="text-xs text-gray-500 uppercase tracking-wide">Button</span>
          </div>
          <div className={`inline-block ${isSelected ? 'ring-2 ring-orange-500 ring-opacity-50 rounded' : ''}`}>
            <button 
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                props.variant === 'secondary' 
                  ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                  : 'bg-orange-600 text-white hover:bg-orange-700'
              }`}
              onClick={(e) => {
                e.preventDefault();
                if (props.href) {
                  if (props.openInNewTab) {
                    window.open(props.href, '_blank', 'noopener,noreferrer');
                  } else {
                    window.location.href = props.href;
                  }
                }
              }}
            >
              {props.label || 'Button'}
              {props.openInNewTab && <span className="ml-2 text-xs">↗</span>}
            </button>
          </div>
        </div>
      );

    case 'hero':
      const heroLayout = props.layout || 'image-right';
      const titleStyle = styleObjectToCss(props.titleStyle || {});
      const contentStyle = styleObjectToCss(props.contentStyle || {});
      
      return (
        <div className="relative">
          <div className="flex items-center space-x-2 mb-2">
            <ElementIcon className="w-4 h-4 text-gray-500" />
            <span className="text-xs text-gray-500 uppercase tracking-wide">Hero Section</span>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 items-center ${isSelected ? 'ring-2 ring-orange-500 ring-opacity-50 p-4 rounded' : 'p-4 border border-gray-200 rounded-lg'}`}>
            {heroLayout === 'image-left' && (
              <div className="order-1 md:order-1">
                {props.image ? (
                  <img 
                    src={props.image} 
                    alt={props.imageAlt || ''} 
                    className="w-full h-64 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">No image</p>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className={heroLayout === 'image-left' ? 'order-2 md:order-2' : 'order-1 md:order-1'}>
              <h2 
                className="text-3xl font-bold text-gray-900 mb-4" 
                style={titleStyle}
              >
                {props.title || 'Hero Title'}
              </h2>
              <p 
                className="text-gray-700 leading-relaxed"
                style={contentStyle}
              >
                {props.content || 'Hero content text goes here. Add your description and details.'}
              </p>
            </div>
            {heroLayout === 'image-right' && (
              <div className="order-2 md:order-2">
                {props.image ? (
                  <img 
                    src={props.image} 
                    alt={props.imageAlt || ''} 
                    className="w-full h-64 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">No image</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      );

    case 'cardGrid':
      const columns = props.columns || 3;
      const alignment = props.alignment || 'start';
      const gridColsClass = columns === 1 ? 'grid-cols-1' : columns === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      const justifyClass = alignment === 'center' ? 'justify-items-center' : alignment === 'end' ? 'justify-items-end' : 'justify-items-start';
      
      return (
        <div className="relative">
          <div className="flex items-center space-x-2 mb-2">
            <ElementIcon className="w-4 h-4 text-gray-500" />
            <span className="text-xs text-gray-500 uppercase tracking-wide">Card Grid</span>
          </div>
          <div className={`grid ${gridColsClass} ${justifyClass} gap-4 ${isSelected ? 'ring-2 ring-orange-500 ring-opacity-50 p-2 rounded' : ''}`}>
            {Array.isArray(props.items) && props.items.length > 0 ? (
              props.items.map((item: any, index: number) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg w-full">
                  {item.image && (
                    <img src={item.image} alt={item.title || ''} className="w-full h-32 object-cover rounded mb-3" />
                  )}
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title || 'Card Title'}</h3>
                  <p className="text-gray-600 text-sm">{item.snippet || 'Card description...'}</p>
                </div>
              ))
            ) : (
              <div className="col-span-full p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
                <Grid className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No cards added yet</p>
              </div>
            )}
          </div>
        </div>
      );

    case 'timeline':
      return (
        <div className="relative">
          <div className="flex items-center space-x-2 mb-2">
            <ElementIcon className="w-4 h-4 text-gray-500" />
            <span className="text-xs text-gray-500 uppercase tracking-wide">Timeline</span>
          </div>
          <div className={`${isSelected ? 'ring-2 ring-orange-500 ring-opacity-50 p-2 rounded' : ''}`}>
            {Array.isArray(props.items) && props.items.length > 0 ? (
              <div className="relative border-l-2 border-gray-200 pl-6">
                {props.items.map((item: any, index: number) => (
                  <div key={index} className="relative mb-6">
                    <div className="absolute -left-2.5 w-5 h-5 bg-orange-600 rounded-full border-2 border-white" />
                    <h4 className="font-semibold text-gray-900">{item.title || 'Timeline Event'}</h4>
                    {item.date && <p className="text-sm text-gray-500">{item.date}</p>}
                    <p className="text-gray-700 mt-1">{item.text || 'Event description...'}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
                <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No timeline events added yet</p>
              </div>
            )}
          </div>
        </div>
      );

    case 'newsletter':
      return (
        <div className="relative">
          <div className="flex items-center space-x-2 mb-2">
            <ElementIcon className="w-4 h-4 text-gray-500" />
            <span className="text-xs text-gray-500 uppercase tracking-wide">Newsletter Signup</span>
          </div>
          <div className={`p-6 border border-gray-200 rounded-lg ${isSelected ? 'ring-2 ring-orange-500 ring-opacity-50' : ''}`}>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {props.heading || 'Subscribe to Our Newsletter'}
            </h3>
            <p className="text-gray-600 mb-4">
              {props.subtext || 'Get the latest updates delivered to your inbox.'}
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                disabled
              />
              <button className="px-6 py-3 bg-orange-600 text-white rounded-r-lg hover:bg-orange-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      );

    case 'mediaKit':
      return (
        <div className="relative">
          <div className="flex items-center space-x-2 mb-2">
            <ElementIcon className="w-4 h-4 text-gray-500" />
            <span className="text-xs text-gray-500 uppercase tracking-wide">Media Kit</span>
          </div>
          <div className={`p-6 border border-gray-200 rounded-lg ${isSelected ? 'ring-2 ring-orange-500 ring-opacity-50' : ''}`}>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Media Kit</h3>
            <p className="text-gray-600 mb-4">Download our comprehensive media kit with logos, images, and company information.</p>
            <button className="btn-primary inline-flex items-center">
              <Download className="w-4 h-4 mr-2" />
              {props.label || 'Download Media Kit'}
            </button>
          </div>
        </div>
      );

    case 'keynotes':
      return (
        <div className="relative">
          <div className="flex items-center space-x-2 mb-2">
            <ElementIcon className="w-4 h-4 text-gray-500" />
            <span className="text-xs text-gray-500 uppercase tracking-wide">Keynotes</span>
          </div>
          <div className={`${isSelected ? 'ring-2 ring-orange-500 ring-opacity-50 p-2 rounded' : ''}`}>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {props.title || 'Keynote Presentations'}
            </h3>
            {Array.isArray(props.items) && props.items.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {props.items.map((item: any, index: number) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">{item.title || 'Keynote Title'}</h4>
                    <p className="text-gray-600 text-sm mb-3">{item.description || 'Keynote description...'}</p>
                    <button className="text-orange-600 text-sm hover:underline">Watch Video</button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
                <Video className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No keynotes added yet</p>
              </div>
            )}
          </div>
        </div>
      );

    default:
      return (
        <div className="relative">
          <div className="flex items-center space-x-2 mb-2">
            <ElementIcon className="w-4 h-4 text-gray-500" />
            <span className="text-xs text-gray-500 uppercase tracking-wide">{type}</span>
          </div>
          <div className={`p-4 border border-gray-200 rounded-lg ${isSelected ? 'ring-2 ring-orange-500 ring-opacity-50' : ''}`}>
            <p className="text-gray-500">Unknown element type: {type}</p>
          </div>
        </div>
      );
  }
}
