import { getImageProps } from 'next/image';

export default function ResponsiveHeroImage(image) {
  const commonSettings = { 
    alt: 'Responsive Hero Banner', 
    sizes: '100vw',
    priority: true 
  };

  // 1. Generate optimized attributes for the Desktop image
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...commonSettings,
    src: '/hero-desktop.jpg',
    width: 1200,
    height: 600,
  });

  // 2. Generate optimized attributes for the Mobile image (fallback img)
  const {
    props: { srcSet: mobileSrcSet, ...restOfImgProps },
  } = getImageProps({
    ...commonSettings,
    src: 'image',
    width: 600,
    height: 400,
  });

  return (
    <picture>
      {/* Target screens larger than 768px with the optimized desktop image */}
      <source media="(min-width: 768px)" srcSet={desktopSrcSet} />
      
      {/* Target smaller devices with the mobile fallback */}
      <source media="(max-width: 767px)" srcSet={mobileSrcSet} />
      
      {/* Native <img> element carries over core Next.js structural optimization props */}
      <img 
        {...restOfImgProps} 
        style={{ width: '100%', height: 'auto' }} 
      />
    </picture>
  );
}