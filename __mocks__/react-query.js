export function useQuery(key, fetcher, options) {
  useQuery.__mockKey(key);
  useQuery.__mockOptions(options);
  useQuery.__fetcher = fetcher;
  return useQuery.__mockResult;
}

useQuery.__mockKey = jest.fn();
useQuery.__mockOptions = jest.fn();

useQuery.__setMockResult = function (result) {
  useQuery.__mockResult = result;
};

export function useInfiniteQuery(key, fetcher, options) {
  useInfiniteQuery.__mockKey(key);
  useInfiniteQuery.__fetcher = fetcher;
  useInfiniteQuery.__mockOptions(options);
  return useInfiniteQuery.__mockResult;
}

useInfiniteQuery.__mockKey = jest.fn();
useInfiniteQuery.__mockOptions = jest.fn();

useInfiniteQuery.__setMockResult = function (result) {
  useInfiniteQuery.__mockResult = result;
};
