import { detect, BrowserInfo } from 'detect-browser';

/**
 * Validate the Peer ID format.
 * @param {string} [id] - A Peer ID.
 * @return {boolean|RegExpExecArray} True if the peerId format is valid. False if not.
 */
function validateId(id: string) {
  // Allow empty ids
  return !id || /^[A-Za-z0-9_-]+(?:[ _-][A-Za-z0-9]+)*$/.exec(id);
}

/**
 * Validate the API key.
 * @param {string} [key] A SkyWay API key.
 * @return {boolean|RegExpExecArray} True if the API key format is valid. False if not.
 */
function validateKey(key: string) {
  // Allow empty keys
  return !key || /^[a-z0-9]{8}(-[a-z0-9]{4}){3}-[a-z0-9]{12}$/.exec(key);
}

/**
 * Return random ID.
 * @return {string} A text consisting of 16 chars.
 */
function randomId() {
  const keyLength = 16;
  // '36' means that we want to convert the number to a string using chars in
  // the range of '0-9a-z'. The concatenated 0's are for padding the key,
  // as Math.random() may produce a key shorter than 16 chars in length
  const randString = Math.random().toString(36) + '0000000000000000000';
  return randString.substr(2, keyLength);
}

/**
 * Generate random token.
 * @return {string} A token consisting of random alphabet and integer.
 */
function randomToken() {
  return Math.random()
    .toString(36)
    .substr(2);
}

/**
 * Combine the sliced ArrayBuffers.
 * @param buffers - An Array of ArrayBuffer.
 * @return The combined ArrayBuffer.
 */
function joinArrayBuffers(buffers: ArrayBuffer[]) {
  const size = buffers.reduce((sum, buffer) => {
    return sum + buffer.byteLength;
  }, 0);
  const tmpArray = new Uint8Array(size);
  let currPos = 0;
  for (const buffer of buffers) {
    tmpArray.set(new Uint8Array(buffer), currPos);
    currPos += buffer.byteLength;
  }
  return tmpArray.buffer;
}

/**
 * Convert Blob to ArrayBuffer.
 * @param {Blob} blob - The Blob to be read as ArrayBuffer.
 * @param {Function} cb - Callback function that called after load event fired.
 */
function blobToArrayBuffer(blob: Blob, cb: Function) {
  const fr = new FileReader();
  fr.onload = event => {
    cb(event?.target?.result);
  };
  fr.readAsArrayBuffer(blob);
}

/**
 * Whether the protocol is https or not.
 * @return {boolean} Whether the protocol is https or not.
 */
function isSecure() {
  return location.protocol === 'https:';
}

/**
 * Detect browser name and version.
 * @return Browser name and major, minor and patch versions. Object is empty if info can't be obtained.
 */
function detectBrowser() {
  // FIXME: unespected cast BrowserInfo. detect() returns nullable.
  const { name, version } = detect() as BrowserInfo;
  const [major, minor, patch] = version.split('.').map(i => parseInt(i));
  return {
    name,
    major,
    minor,
    patch,
  };
}

/**
 * Safari 12.1 may use plan-b sdp and also unified-plan sdp.
 * It depends on user settings.
 * See https://webkit.org/blog/8672/on-the-road-to-webrtc-1-0-including-vp8/
 *
 * @return {boolean} Browser is plan-b Safari or NOT
 */
function isPlanBSafari() {
  // FIXME: unespected cast BrowserInfo. detect() returns nullable.
  const { name } = detect() as BrowserInfo;

  // safari for macOS, ios for iOS
  if (!(name === 'safari' || name === 'ios')) {
    return false;
  }
  // supports unified-plan
  if (RTCRtpTransceiver.prototype.hasOwnProperty('currentDirection')) {
    return false;
  }

  return true;
}

export default {
  validateId,
  validateKey,
  randomId,
  randomToken,
  joinArrayBuffers,
  blobToArrayBuffer,
  isSecure,
  detectBrowser,
  isPlanBSafari,
};
