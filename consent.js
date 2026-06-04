(function(){
 const COOKIE_NAME='prowebia_consent';
 const COOKIE_DURATION=365;
 
 function getCookie(name){
 const match=document.cookie.match(new RegExp('(?:^|;)'+name+'=([^;]*)'));
 return match?decodeURIComponent(match[1]):null;
}
 function setCookie(name,value,days){
 const expires=new Date(Date.now()+days*864e5).toUTCString();
 document.cookie=name+'='+encodeURIComponent(value)
+';expires='+expires
+';path=/;SameSite=Lax';
}
 
 function pushConsent(granted){
 const state=granted?'granted':'denied';
 window.dataLayer=window.dataLayer||[];
 window.dataLayer.push({
 event:'consent_update',
 consent:{
 analytics_storage:state,
 ad_storage:state,
 ad_user_data:state,
 ad_personalization:state,
 functionality_storage:'granted',
 security_storage:'granted',
}
});
}
 
 function applyConsent(value){
 pushConsent(value==='granted');
}
 
 function showBanner(){
 document.getElementById('consent-overlay').classList.add('is-visible');
 document.getElementById('consent-banner').classList.add('is-visible');
 document.body.classList.add('consent-pending');
}
 function hideBanner(){
 document.getElementById('consent-overlay').classList.remove('is-visible');
 document.getElementById('consent-banner').classList.remove('is-visible');
 document.body.classList.remove('consent-pending');
}
 
 function accept(){
 setCookie(COOKIE_NAME,'granted',COOKIE_DURATION);
 applyConsent('granted');
 hideBanner();
}
 function refuse(){
 setCookie(COOKIE_NAME,'denied',COOKIE_DURATION);
 applyConsent('denied');
 hideBanner();
}
 
 function init(){
 const saved=getCookie(COOKIE_NAME);
 if(saved){
 
 applyConsent(saved);
}else{
 
 pushConsent(false);
 showBanner();
}
 
 const btnAccept=document.getElementById('consent-accept');
 const btnRefuse=document.getElementById('consent-refuse');
 if(btnAccept)btnAccept.addEventListener('click',accept);
 if(btnRefuse)btnRefuse.addEventListener('click',refuse);
 
 const overlay=document.getElementById('consent-overlay');
 if(overlay)overlay.addEventListener('click',refuse);
}
 
 if(document.readyState==='loading'){
 document.addEventListener('DOMContentLoaded',init);
}else{
 init();
}
})();