import type { Metadata } from 'next';
import SEO from '../../../ui/utils/helmet';

type SeoEntry = {
  title: string;
  description: string;
  image?: string;
};

const DEFAULT: SeoEntry = {
  title: 'Comprehensive digital banking infrastructure',
  description: 'With Finto you can deploy innovative digital banking products or embed financial services into your customer experience at extraordinary speed. Get started today',
};

export function getMetadataByKey(key: keyof typeof SEO = 'missing'): Metadata {
  const { title, description } = SEO[key] ?? DEFAULT;

  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { title, description },
  };
}
