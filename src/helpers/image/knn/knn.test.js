import knn from './knn';

describe('helpers/image/knn', () => {
  def('src', () => 'gs://kn3/30440004e3257a156d1291863ff21ef4.jpg');
  def('fn', () => knn.formatAvatar);
  def('subject', () => $fn($src));

  context('format avatar', () => {
    it('returns crop:90x90', () => {
      expect($subject).toBe(
        'https://media.taringa.net/knn/crop:90x90/Z3M6Ly9rbjMvMzA0NDAwMDRlMzI1N2ExNTZkMTI5MTg2M2ZmMjFlZjQuanBn',
      );
    });
  });

  context('format background', () => {
    def('fn', () => knn.formatBackground);

    it('returns fit:550', () => {
      expect($subject).toBe(
        'https://media.taringa.net/knn/fit:550/Z3M6Ly9rbjMvMzA0NDAwMDRlMzI1N2ExNTZkMTI5MTg2M2ZmMjFlZjQuanBn',
      );
    });
  });

  context('format identity', () => {
    def('fn', () => knn.formatIdentity);

    it('returns indentity', () => {
      expect($subject).toBe(
        'https://media.taringa.net/knn/identity/Z3M6Ly9rbjMvMzA0NDAwMDRlMzI1N2ExNTZkMTI5MTg2M2ZmMjFlZjQuanBn',
      );
    });
  });

  context('format story image', () => {
    def('fn', () => knn.formatStoryImage);

    it('returns fit:550', () => {
      expect($subject).toBe(
        'https://media.taringa.net/knn/fit:550/Z3M6Ly9rbjMvMzA0NDAwMDRlMzI1N2ExNTZkMTI5MTg2M2ZmMjFlZjQuanBn',
      );
    });
  });

  context('format thumbnail', () => {
    def('fn', () => knn.formatThumbnail);

    it('returns crop:150x115', () => {
      expect($subject).toBe(
        'https://media.taringa.net/knn/crop:150x115/Z3M6Ly9rbjMvMzA0NDAwMDRlMzI1N2ExNTZkMTI5MTg2M2ZmMjFlZjQuanBn',
      );
    });
  });
});
