import{a as E,S as P,i as n}from"./assets/vendor-B5nsgUv9.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function r(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(t){if(t.ep)return;t.ep=!0;const s=r(t);fetch(t.href,s)}})();const S="https://pixabay.com/api/",M="54780845-41e3c81e8142d8214168add5e",q=15;async function g(a,e){return(await E.get(S,{params:{key:M,q:a,page:e,per_page:q,image_type:"photo",orientation:"horizontal",safesearch:!0}})).data}const p=document.querySelector(".gallery"),f=document.querySelector(".loader-wrapper"),y=document.querySelector(".load-more"),R=new P(".gallery a",{captionsData:"alt",captionDelay:250});function $({webformatURL:a,largeImageURL:e,tags:r,likes:o,views:t,comments:s,downloads:i}){return`
    <li class="gallery-item">
      <a class="gallery-link" href="${e}">
        <img
          class="gallery-image"
          src="${a}"
          alt="${r}"
          loading="lazy"
        />
      </a>
      <ul class="image-stats">
        <li class="image-stat">
          <span class="image-stat-label">Likes</span>
          <span class="image-stat-value">${o}</span>
        </li>
        <li class="image-stat">
          <span class="image-stat-label">Views</span>
          <span class="image-stat-value">${t}</span>
        </li>
        <li class="image-stat">
          <span class="image-stat-label">Comments</span>
          <span class="image-stat-value">${s}</span>
        </li>
        <li class="image-stat">
          <span class="image-stat-label">Downloads</span>
          <span class="image-stat-value">${i}</span>
        </li>
      </ul>
    </li>
  `}function h(a){const e=a.map($).join("");p.insertAdjacentHTML("beforeend",e),R.refresh()}function B(){p.innerHTML=""}function L(){f.classList.add("is-visible")}function b(){f.classList.remove("is-visible")}function O(){y.classList.add("is-visible")}function d(){y.classList.remove("is-visible")}const m=document.querySelector(".form"),A=m.elements["search-text"],_=document.querySelector(".load-more"),x=15;let c="",l=1,u=0;m.addEventListener("submit",C);_.addEventListener("click",H);async function C(a){a.preventDefault();const e=A.value.trim();if(!e){n.error({position:"topRight",message:"Please enter a search query."});return}c=e,l=1,u=0,B(),d(),L();try{const r=await g(c,l),o=r.hits;if(u=r.totalHits,!o.length){n.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"});return}h(o),v()}catch{n.error({position:"topRight",message:"Something went wrong. Please try again later."})}finally{b(),m.reset()}}async function H(){l+=1,d(),L();try{const e=(await g(c,l)).hits;if(!e.length){w();return}h(e),D(),v()}catch{n.error({position:"topRight",message:"Something went wrong. Please try again later."})}finally{b()}}function v(){const a=Math.ceil(u/x);if(l>=a){d(),w();return}O()}function w(){n.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."})}function D(){const a=document.querySelector(".gallery-item");if(!a)return;const e=a.getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
