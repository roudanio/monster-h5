/**
 * Created by meathill on 2017/6/26.
 */
var isWeixin = /micromessenger/i.test(navigator.userAgent.toLowerCase());
function autoPlayMusic() {
  var query = location.search;
  var mp3 = query ? 'daiquan' : 'qitian';
  var audio = document.getElementById('music');
  audio.src = './audio/' + mp3 + '.mp3';
  audio.play();
}
document.addEventListener('WeixinJSBridgeReady', autoPlayMusic, false);