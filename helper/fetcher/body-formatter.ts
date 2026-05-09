type Formatter = (data: Record<string, any>) => string;

const BodyFormatters : Record<string, Formatter> = {
  'application/json': (data) => generateBodyJson(data),
  'application/x-www-form-urlencoded': (data) => generateBodyString(data)
};

const generateBodyJson = (data: Record<any, any>) => {
  return JSON.stringify(data);
};

export const generateBodyString = (data: Record<any, any>) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

export const prepareBody = (headersInit: HeadersInit, data: Record<string, any> = {}) => {
  // Find the Content-Type key regardless of casing
  const headers = new Headers(headersInit);
  const contentType = headers.get('Content-Type') || '';

  // Execute the strategy or fall back to default
  const formatter = BodyFormatters[contentType];
  return formatter(data);
};