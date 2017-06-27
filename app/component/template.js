/**
 * Created by meathill on 2017/6/25.
 */
export let navTemplate = `
<a href="#/about" class="about nav-link"></a>
<a href="#/chupin" class="chupin nav-link"></a>
<a href="#/intro" class="intro nav-link"></a>
<a href="#/zhuchuang" class="zhuchuang nav-link"></a>
<a href="#/price" class="price nav-link"></a>
<a href="#/video" class="video nav-link"></a>
<footer></footer>
`;

let page = `
  <a href="#/home" class="back-button"></a>
`;
export let about = page;
export let chupin = page;
export let intro = page;
export let price = page;

export let zhuchuang = `
  <div class="haibao-link">
    <a href="#/zhuchuang/pengyuyan"></a>
    <a href="#/zhuchuang/nini"></a>
    <a href="#/zhuchuang/ouhao"></a>
    <a href="#/zhuchuang/yuwenle"></a>
    <a href="#/zhuchuang/zhengshuang"></a>
    <a href="#/zhuchuang/qiaoshan"></a>
    <a href="#/zhuchuang/yangdi"></a>
    <a href="#/zhuchuang/yufeihong" class="bottom"></a>
  </div>
  <a href="#/home" class="back-button"></a>
`;

export let video = `
  <video src="http://qiniu.meathill.com/video/wukong/trailer.m4v" width="300" height="200" preload="auto"></video>
  <a href="#/home" class="back-button"></a>
`;

export let haibao = `
  <img src="./img/haibao/{{name}}.jpg">
  <a href="#/zhuchuang" class="back-button"></a>
`;