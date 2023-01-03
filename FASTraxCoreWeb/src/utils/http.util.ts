function getQueryParam(queryParams?: any) {
  return queryParams ? `?${encodeURIComponent(queryParams)}` : '';
}

export {getQueryParam};
