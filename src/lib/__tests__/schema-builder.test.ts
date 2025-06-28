import { buildLocalBusinessSchema, buildFAQSchema } from '../schema-builder';
import type { LocationData } from '../location-utils';

describe('Schema Builder', () => {
  const mockLocation: LocationData = {
    name: 'Red Deer',
    slug: 'red-deer',
    region: 'Central',
    priority: 1,
    description: 'Professional eavestrough services in Red Deer, Alberta.',
    coordinates: {
      lat: 52.2681,
      lng: -113.8112
    }
  };

  describe('buildLocalBusinessSchema', () => {
    it('should build schema without location', () => {
      const schema = buildLocalBusinessSchema();
      
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('LocalBusiness');
      expect(schema.name).toBe('Lacombe Gutters');
      expect(schema.telephone).toBeDefined();
      expect(schema.email).toBeDefined();
      expect(schema.address).toBeDefined();
      expect(schema.areaServed).toBeInstanceOf(Array);
      expect(schema.areaServed.length).toBeGreaterThan(0);
      expect(schema.serviceType).toBeInstanceOf(Array);
      expect(schema.serviceType).toContain('Eavestrough Installation');
    });

    it('should build schema with location', () => {
      const schema = buildLocalBusinessSchema(mockLocation);
      
      expect(schema.name).toBe('Lacombe Gutters - Red Deer');
      expect(schema.description).toBe(mockLocation.description);
      expect(schema.geo).toBeDefined();
      expect(schema.geo?.latitude).toBe(52.2681);
      expect(schema.geo?.longitude).toBe(-113.8112);
    });

    it('should include required business information', () => {
      const schema = buildLocalBusinessSchema();
      
      expect(schema.openingHours).toBeInstanceOf(Array);
      expect(schema.openingHours.length).toBeGreaterThan(0);
      expect(schema.priceRange).toBe('$$');
      expect(schema.sameAs).toBeInstanceOf(Array);
      expect(schema.image).toBeInstanceOf(Array);
      expect(schema.image.length).toBeGreaterThan(0);
    });
  });

  describe('buildFAQSchema', () => {
    it('should build FAQ schema', () => {
      const schema = buildFAQSchema();
      
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('FAQPage');
      expect(schema.mainEntity).toBeInstanceOf(Array);
      expect(schema.mainEntity.length).toBeGreaterThan(0);
      
      schema.mainEntity.forEach((item: { '@type': string; name: string; acceptedAnswer: { '@type': string; text: string } }) => {
        expect(item['@type']).toBe('Question');
        expect(item.name).toBeDefined();
        expect(item.acceptedAnswer).toBeDefined();
        expect(item.acceptedAnswer['@type']).toBe('Answer');
        expect(item.acceptedAnswer.text).toBeDefined();
      });
    });

    it('should include common business questions', () => {
      const schema = buildFAQSchema();
      const questions = schema.mainEntity.map((item: { name: string }) => item.name);
      
      expect(questions).toContain('What areas do you service?');
      expect(questions).toContain('Do you provide free estimates?');
      expect(questions).toContain('What services do you offer?');
    });
  });
});
