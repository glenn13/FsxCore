export function debounce(callback: any, wait: number) {
  let timeout: number;

  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(function (this: typeof debounce) {
      callback.apply(this, args);
    }, wait);
  };
}
