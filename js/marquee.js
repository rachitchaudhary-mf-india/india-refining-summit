var
mqAry1=['images/partners/teri.jpg','images/partners/invest-india.jpg','images/partners/aiai.jpg','images/partners/zyfra.jpg','images/partners/accenture.jpg','images/partners/schlumberger.jpg','images/partners/agilent.jpg','images/partners/eil.jpg','images/partners/make-in-india.jpg','images/partners/petrowatch.jpg','images/partners/worldoils.jpg','images/partners/world-of-chemicals.jpg'];

var
mqAry2=['images/partners/zyfra.jpg','images/partners/accenture.jpg','images/partners/schlumberger.jpg','images/partners/agilent.jpg','images/partners/eil.jpg','images/partners/make-in-india.jpg','images/partners/petrowatch.jpg','images/partners/worldoils.jpg','images/partners/world-of-chemicals.jpg','images/partners/teri.jpg','images/partners/invest-india.jpg','images/partners/aiai.jpg'];

function start() {
   new mq('m1',mqAry1,220);
   new mq('m2',mqAry2,220);// repeat for as many fuields as required
   mqRotate(mqr); // must come last
}
window.onload = start;

// Continuous Image Marquee
// copyright 24th July 2008 by Stephen Chapman
// http://javascript.about.com
// permission to use this Javascript on your web page is granted
// provided that all of the code below in this script (including these
// comments) is used without any alteration

var 
mqr = []; function
mq(id,ary,wid){this.mqo=document.getElementById(id); var heit =
this.mqo.style.height; this.mqo.onmouseout=function()
{mqRotate(mqr);}; this.mqo.onmouseover=function()
{clearTimeout(mqr[0].TO);}; this.mqo.ary=[]; var maxw = ary.length;
for (var
i=0;i<maxw;i++){this.mqo.ary[i]=document.createElement('img');
this.mqo.ary[i].src=ary[i]; this.mqo.ary[i].style.position =
'absolute'; this.mqo.ary[i].style.left = (wid*i)+'px';
this.mqo.ary[i].style.width = wid+'px'; this.mqo.ary[i].style.height =
heit; this.mqo.appendChild(this.mqo.ary[i]);} mqr.push(this.mqo);}
function mqRotate(mqr){if (!mqr) return; for (var j=mqr.length - 1; j
> -1; j--) {maxa = mqr[j].ary.length; for (var i=0;i<maxa;i++){var x =
mqr[j].ary[i].style;  x.left=(parseInt(x.left,10)-1)+'px';} var y =
mqr[j].ary[0].style; if (parseInt(y.left,10)+parseInt(y.width,10)<0)
{var z = mqr[j].ary.shift(); z.style.left = (parseInt(z.style.left) +
parseInt(z.style.width)*maxa) + 'px'; mqr[j].ary.push(z);}}
mqr[0].TO=setTimeout('mqRotate(mqr)',10);}