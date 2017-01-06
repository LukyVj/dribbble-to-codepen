const Vibrant = require('node-vibrant');

// module.exports = DribbbleToCodepen;


class DribbbleToCodepen extends HTMLElement {
  constructor() {
    super();
  }
}

// Define the new element
customElements.define('dribbble-to-codepen', DribbbleToCodepen);
const db2cp = document.querySelector('dribbble-to-codepen');
const dbShot = db2cp.getAttribute('data-shot');
let dbContainer = document.createElement('div');
let dbColorSwatch = document.createElement('div');
let dbShotWrapper = document.createElement('div');
let dbImgContainer = document.createElement('div');
let dbShotInformations = document.createElement('div');
let dbShotName = document.createElement('h1');
let dbAuthorName = document.createElement('h3');
let dbShotUrl = document.createElement('h3');
let dbImage = document.createElement('img');

const colorSwatchBadgeStyle = `
  width: 20px;
  height: 20px;
  display: inline-block;
  margin-right: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  float:left;
`;


function setStyle(element, styleBlock, edits) {
  if (edits) {
    return element.setAttribute('style', styleBlock.join('') + edits);
  } else {
    return element.setAttribute('style', styleBlock.join(''));
  }
}

function addClass(element, className) {
  return element.classList.add(className);
}

const key = '445956109659ed1b8303540966fd6ad3f1036a740feefddae9880346e8738b05';
fetch(`https://api.dribbble.com/v1/shots/${dbShot}?access_token=${key}`)
  .then((data) => data.json())
  .then((data) => {
    console.log(data);
    const shotUrl = data.images.hidpi;
    const shotName = data.title;
    const authorName = data.user.name;
    let dbColorsArray = [];
    let colorsArray = [];
    let colorsTeplate = ``;
    dbImage.src = shotUrl;

    dbImage.addEventListener('load', function() {
      Vibrant.from(dbImage).getPalette(function(err, palette) {
        if (err) {
          console.warn(err);
          return;
        }
        const types = ['Vibrant', 'Muted', 'DarkVibrant', 'DarkMuted', 'LightVibrant', 'LightMuted'];

        types.forEach(function(type) {
          colorsArray.push(`<li data-color="rgb(${palette[type].rgb.join(',')})" style="width:100%;margin-bottom:1em;font-family:courier;line-height: 1.3"><span style="${colorSwatchBadgeStyle} background-color: rgb(${palette[type].rgb.join(',')})"></span>${Vibrant.Util.rgbToHex(...palette[type].rgb)}</li>`);
        });

        dbColorSwatch.innerHTML = `<ul style="list-style:none;padding:0;">${colorsArray.join('')}</ul>`;
      })
    });

    dbShotName.textContent = `🏀  ${shotName}`;
    dbAuthorName.textContent = `👤 ${authorName}`;
  });


// Build the dropdown


const db2cpStyle = [
  'display: flex;',
  'flex-direction: column;',
  'align-items: center;',
  'width: 100%;',
  'position: fixed;',
  'height: 100vh;',
  'background: #F3F3F3;',
  'transform: translateY(-98vh);',
  'border-bottom: 1px solid #ccc;',
  'transition: transform 0.3s ease;',
  'box-sizing: border-box;',
  'color: #666;'
];

const db2cpContainerStyle = [
  'display: flex;',
  'flex-wrap: wrap;',
  'flex-direction: row;',
  'align-items: flex-start;',
  'height: 100%;',
  'padding: 1em 2em;'
];

const db2cpShotWrapperStyle = [
  'display: flex;',
  'flex-wrap: wrap;',
  'flex-direction: row;',
  'align-items: center;',
  'width: 100%;',
  'flex: 100%;'
];

const db2cpImgStyle = [
  'display:block;',
  'width: 80%;',
  'max-width: 600px;',
  'border: 1px solid #D7D8E1;',
  'box-shadow: 0 10px 50px #888;'
];

const db2cpImgContainerStyle = [
  'flex: 70%;'
];

const db2cpColorSwatchStyle = [
  'flex: 20%;',
  'padding-left: 2em;',
  'align-self: center;'
];

const db2cpShotInformationsStyle = [
  'flex: 100%;',
  'height: 200px;',
  'align-self: flex-end;',
  'margin-top: 3em;'
];

addClass(dbContainer, 'db2cp--container');
addClass(dbImgContainer, 'db2cp--imgContainer');
addClass(dbShotWrapper, 'db2cp--shotWrapper');
addClass(dbShotInformations, 'db2cp--shotInformations');
addClass(dbColorSwatch, 'db2cp--colorSwatch');

setStyle(db2cp, db2cpStyle, 'font-family: "San Francisco", -apple-system, BlinkMacSystemFont, ".SFNSText-Regular", Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif;');
setStyle(dbContainer, db2cpContainerStyle, false);
setStyle(dbShotInformations, db2cpShotInformationsStyle, false);
setStyle(dbImgContainer, db2cpImgContainerStyle, false);
setStyle(dbShotWrapper, db2cpShotWrapperStyle, false);
setStyle(dbColorSwatch, db2cpColorSwatchStyle, false);
setStyle(dbImage, db2cpImgStyle, false);

dbImage.setAttribute('onerror', 'this.src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIyNzRweCIgaGVpZ2h0PSIyMTZweCIgdmlld0JveD0iMCAwIDI3NCAyMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+ICAgICAgICA8dGl0bGU+R3JvdXA8L3RpdGxlPiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4gICAgPGRlZnM+ICAgICAgICA8cmVjdCBpZD0icGF0aC0xIiB4PSIwIiB5PSIwIiB3aWR0aD0iMjc0IiBoZWlnaHQ9IjIxNiI+PC9yZWN0PiAgICAgICAgPG1hc2sgaWQ9Im1hc2stMiIgbWFza0NvbnRlbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIG1hc2tVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIHg9IjAiIHk9IjAiIHdpZHRoPSIyNzQiIGhlaWdodD0iMjE2IiBmaWxsPSJ3aGl0ZSI+ICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPSIjcGF0aC0xIj48L3VzZT4gICAgICAgIDwvbWFzaz4gICAgPC9kZWZzPiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4gICAgICAgIDxnIGlkPSJHcm91cCI+ICAgICAgICAgICAgPHVzZSBpZD0iUmVjdGFuZ2xlLTIiIHN0cm9rZT0iI0JCQkJCQiIgbWFzaz0idXJsKCNtYXNrLTIpIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9IiNGM0YzRjMiIHhsaW5rOmhyZWY9IiNwYXRoLTEiPjwvdXNlPiAgICAgICAgICAgIDx0ZXh0IGlkPSJVaC1vaC06KCIgb3BhY2l0eT0iMC4zOTE5ODM2OTYiIGZvbnQtZmFtaWx5PSJIZWx2ZXRpY2FOZXVlLUJvbGQsIEhlbHZldGljYSBOZXVlIiBmb250LXNpemU9IjU1IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzAwMDAwMCI+ICAgICAgICAgICAgICAgIDx0c3BhbiB4PSIzNSIgeT0iMTExIj5VaCBvaCA6KDwvdHNwYW4+ICAgICAgICAgICAgPC90ZXh0PiAgICAgICAgICAgIDx0ZXh0IGlkPSJpbWFnZS1ub3QtbG9hZGVkIiBvcGFjaXR5PSIwLjM5MTk4MzY5NiIgZm9udC1mYW1pbHk9IkhlbHZldGljYU5ldWUtQm9sZCwgSGVsdmV0aWNhIE5ldWUiIGZvbnQtc2l6ZT0iMjUiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjMDAwMDAwIj4gICAgICAgICAgICAgICAgPHRzcGFuIHg9IjM1IiB5PSIxNDciPmltYWdlIG5vdCBsb2FkZWQ8L3RzcGFuPiAgICAgICAgICAgIDwvdGV4dD4gICAgICAgIDwvZz4gICAgPC9nPjwvc3ZnPg=="');

dbShotUrl.innerHTML = `🔗 <a href="https://dribbble.com/shots/${dbShot}" style="color:inherit;text-decoration: none">${dbShot}</a>`;
dbImgContainer.appendChild(dbImage);
dbShotInformations.appendChild(dbShotName);
dbShotInformations.appendChild(dbAuthorName);
dbShotInformations.appendChild(dbShotUrl);
dbShotWrapper.appendChild(dbImgContainer);
dbShotWrapper.appendChild(dbColorSwatch);
dbContainer.appendChild(dbShotInformations);
dbContainer.appendChild(dbShotWrapper);
db2cp.appendChild(dbContainer);


db2cp.onmouseover = function() {
  this.style.webkitTransform = 'translateY(-10vh)';
  this.style.transform = 'translateY(-10vh)';
}

db2cp.onmouseleave = function() {
  this.style.webkitTransform = 'translateY(-98vh)';
  this.style.transform = 'translateY(-98vh)';
}


module.exports = DribbbleToCodepen;
