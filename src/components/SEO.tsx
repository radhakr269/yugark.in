import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  type?: 'website' | 'article';
}

export default function SEO({ 
  title = 'YUGARK Digital Studio | Premium Websites & Content Solutions',
  description = 'Custom high-performance websites, short promotional videos, and monthly social media growth solutions built to move your business forward. Founded by Mr. Radha Krishna.',
  canonicalUrl = 'https://yugark.in',
  type = 'website'
}: SEOProps) {
  useEffect(() => {
    // 1. Page Title
    const formattedTitle = title.includes('YUGARK') ? title : `${title} | YUGARK Digital Studio`;
    document.title = formattedTitle;
    
    // 2. Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Open Graph Tags
    const ogTags = [
      { property: 'og:title', content: formattedTitle },
      { property: 'og:description', content: description },
      { property: 'og:type', content: type },
      { property: 'og:url', content: window.location.href },
      { property: 'og:site_name', content: 'YUGARK Digital Studio' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: formattedTitle },
      { name: 'twitter:description', content: description }
    ];

    ogTags.forEach(({ property, name, content }) => {
      const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (property) el.setAttribute('property', property);
        if (name) el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    });

    // 4. JSON-LD Schema Markup
    let scriptTag = document.querySelector('#yugark-schema-jsonld') as HTMLScriptElement;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'yugark-schema-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': 'https://yugark.in/#organization',
          'name': 'YUGARK Digital Studio',
          'url': 'https://yugark.in',
          'email': 'business@yugark.in',
          'telephone': '+91 9125205132',
          'founder': {
            '@type': 'Person',
            'name': 'Mr. Radha Krishna',
            'jobTitle': 'Founder'
          },
          'sameAs': [
            'https://wa.me/919125205132'
          ]
        },
        {
          '@type': 'ProfessionalService',
          '@id': 'https://yugark.in/#service',
          'name': 'YUGARK Digital Studio',
          'url': 'https://yugark.in',
          'priceRange': '₹3,000 - ₹19,999',
          'address': {
            '@type': 'PostalAddress',
            'addressCountry': 'IN'
          },
          'telephone': '+91 9125205132',
          'email': 'business@yugark.in'
        }
      ]
    };

    scriptTag.text = JSON.stringify(schemaData);

  }, [title, description, canonicalUrl, type]);

  return null;
}
