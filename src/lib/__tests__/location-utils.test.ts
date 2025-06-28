import { 
  getAllLocationSlugs, 
  getLocationData, 
  getAllLocations, 
  getLocationsByRegion, 
  getLocationsByPriority 
} from '../location-utils';

describe('Location Utils', () => {
  describe('getAllLocationSlugs', () => {
    it('should return an array of location slugs', () => {
      const slugs = getAllLocationSlugs();
      expect(Array.isArray(slugs)).toBe(true);
      expect(slugs.length).toBeGreaterThan(0);
      expect(slugs).toContain('red-deer');
      expect(slugs).toContain('lacombe');
    });
  });

  describe('getLocationData', () => {
    it('should return location data for valid slug', () => {
      const location = getLocationData('red-deer');
      expect(location).not.toBeNull();
      expect(location?.name).toBe('Red Deer');
      expect(location?.slug).toBe('red-deer');
      expect(location?.region).toBe('Central');
      expect(location?.priority).toBe(1);
    });

    it('should return null for invalid slug', () => {
      const location = getLocationData('invalid-slug');
      expect(location).toBeNull();
    });
  });

  describe('getAllLocations', () => {
    it('should return all locations', () => {
      const locations = getAllLocations();
      expect(Array.isArray(locations)).toBe(true);
      expect(locations.length).toBeGreaterThan(0);
      expect(locations[0]).toHaveProperty('name');
      expect(locations[0]).toHaveProperty('slug');
      expect(locations[0]).toHaveProperty('region');
      expect(locations[0]).toHaveProperty('priority');
    });
  });

  describe('getLocationsByRegion', () => {
    it('should return locations for valid region', () => {
      const centralLocations = getLocationsByRegion('Central');
      expect(Array.isArray(centralLocations)).toBe(true);
      expect(centralLocations.length).toBeGreaterThan(0);
      centralLocations.forEach(location => {
        expect(location.region).toBe('Central');
      });
    });

    it('should return empty array for invalid region', () => {
      const invalidLocations = getLocationsByRegion('Invalid');
      expect(Array.isArray(invalidLocations)).toBe(true);
      expect(invalidLocations.length).toBe(0);
    });
  });

  describe('getLocationsByPriority', () => {
    it('should return locations for valid priority', () => {
      const priority1Locations = getLocationsByPriority(1);
      expect(Array.isArray(priority1Locations)).toBe(true);
      expect(priority1Locations.length).toBeGreaterThan(0);
      priority1Locations.forEach(location => {
        expect(location.priority).toBe(1);
      });
    });

    it('should return empty array for invalid priority', () => {
      const invalidLocations = getLocationsByPriority(999);
      expect(Array.isArray(invalidLocations)).toBe(true);
      expect(invalidLocations.length).toBe(0);
    });
  });
});
