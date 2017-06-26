/**
 * Created by meathill on 2017/6/26.
 */

export function embedScript(src, callback) {
  let script = document.createElement('script');
  script.async = true;
  script.type = 'text/javascript';
  script.src = src;
  script.onload = callback;
  document.body.appendChild(script);
}