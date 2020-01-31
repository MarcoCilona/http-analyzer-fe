// eslint-disable-next-line import/prefer-default-export
export function generateRequest(request: any) {
  const randomStatusCode: number = Math.random();
  let status = 200;
  if (randomStatusCode < 0.2) {
    status = 500;
  } else if (randomStatusCode < 0.4) {
    status = 404;
  } else if (randomStatusCode < 0.6) {
    status = 302;
  }

  const response: any[] = [];
  response.push({
    http_version_string: 'HTTP/1.1',
    reason: 'OK',
    request_date: 'Thu, 23 Jan 2020',
    request_server: 'gws',
    status_code: status,
    url: request.url,
  });

  if (status === 302) {
    response.push({
      http_version_string: 'HTTP/1.1',
      reason: 'OK',
      request_date: 'Thu, 23 Jan 2020',
      request_server: 'gws',
      status_code: 200,
      url: request.url,
    });
  }

  return {
    data: {
      request: {
        domain: request.url,
        method: request.method,
        path: request.url.split(/\//)[1],
        scheme: Math.random() < 0.5 ? 'HTTP' : 'HTTPS',
      },
      response,
      url: request.url,
    },
    errors: {},
    status
  };
}

export function generateSpeedRequest() {
  return {
    first_interaction: 120,
    page_load: 720,
  };
}
