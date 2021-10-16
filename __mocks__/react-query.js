let mockResult = Object.create(null);

const mockKey = jest.fn();

export function useQuery(key, fetcher) {
  mockKey(key);
  useQuery.__fetcher = fetcher;
  return mockResult;
}

useQuery.__mockKey = mockKey;

useQuery.__setMockResult = function (result) {
  mockResult = result;
};
