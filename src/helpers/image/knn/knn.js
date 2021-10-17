import { DEFAULT_AVATAR, DEFAULT_BACKGROUND, DEFAULT_THUMBNAIL, KNN_URL } from './constants';

function toBase64(src) {
  return Buffer.from(src).toString('base64').replace(/=/g, '').replace(/\//g, '_');
}

function createFormat(options = {}) {
  const { preset, fallback, gif = false } = options;

  function format(src) {
    if (typeof src !== 'string' || src === '') {
      return fallback;
    }

    const finalPreset = gif && src.endsWith('.gif') ? `thumbGif:${preset}` : preset;

    return `${KNN_URL}/${finalPreset}/${toBase64(src)}`;
  }

  return format;
}

const formats = {
  formatAvatar: createFormat({
    fallback: DEFAULT_AVATAR,
    gif: true,
    preset: 'crop:90x90',
  }),
  formatBackground: createFormat({
    fallback: DEFAULT_BACKGROUND,
    gif: true,
    preset: 'fit:550',
  }),
  formatThumbnail: createFormat({
    fallback: DEFAULT_THUMBNAIL,
    gif: true,
    preset: 'crop:150x115',
  }),
  formatIdentity: createFormat({
    fallback: DEFAULT_THUMBNAIL,
    preset: 'identity',
  }),
  formatStoryImage: createFormat({
    fallback: DEFAULT_THUMBNAIL,
    preset: 'fit:550',
  }),
};

export default formats;
