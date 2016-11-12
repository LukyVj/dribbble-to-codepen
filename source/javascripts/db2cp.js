(function() {
  class DribbbleToCodepen extends HTMLElement {
    constructor() {
      super();
    }
  }

  // Define the new element
  customElements.define('dribbble-to-codepen', DribbbleToCodepen);
  const db2cp = document.querySelector('dribbble-to-codepen');
  const dbUrl = db2cp.getAttribute('data-url');

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

  // Request the dribbble page, and fill in variables
  var getJSON = function(url) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('get', url, true);
      xhr.responseType = 'document';
      xhr.onload = function() {
        var status = xhr.status;
        if (status == 200) {
          resolve(xhr.response);
        } else {
          reject(status);
        }
      };
      xhr.send();
    });
  };

  getJSON('http://crossorigin.me/' + dbUrl).then(function(data) {
    console.log(data)
    const shotUrl = data.querySelector('.the-shot');
    const dbColorsSource = data.querySelector('.color-chips.group').children;
    const shotName = data.querySelector('.slat-header h1').textContent;
    const authorName = data.querySelector('.shot-byline-user').textContent;
    let dbColorsArray = [];
    let colorsArray = [];
    let colorsTeplate = ``;
    dbImage.src = shotUrl.getAttribute('data-img-src');

    for (var i = 0; i < dbColorsSource.length; i++) {
      dbColorsArray.push(dbColorsSource[i]);
    }

    dbColorsArray.forEach(function(e, s) {
      colorsArray.push(`<li data-color="${e.querySelector('a').textContent}" style="width:100%;margin-bottom:1em;font-family:courier;line-height: 1.3"><span style="${colorSwatchBadgeStyle} background: ${e.querySelector('a').textContent}"></span>${e.querySelector('a').textContent}</li>`);
    });

    dbShotName.textContent = '🏀 ' + shotName;
    dbAuthorName.textContent = '👤' + authorName;
    dbColorSwatch.innerHTML = '<ul style="list-style:none;padding:0;">'+ colorsArray.join('') + '</ul>';
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

  dbContainer.classList.add('db2cp--container');
  dbImgContainer.classList.add('db2cp--imgContainer');
  dbShotWrapper.classList.add('db2cp--shotWrapper');
  dbShotInformations.classList.add('db2cp--shotInformations');
  dbColorSwatch.classList.add('db2cp--colorSwatch');



  db2cp.setAttribute('style', db2cpStyle.join('') + 'font-family: "San Francisco", -apple-system, BlinkMacSystemFont, ".SFNSText-Regular", Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif;');
  dbContainer.setAttribute('style', db2cpContainerStyle.join(''));
  dbShotInformations.setAttribute('style', db2cpShotInformationsStyle.join(''));
  dbImgContainer.setAttribute('style', db2cpImgContainerStyle.join(''));
  dbShotWrapper.setAttribute('style', db2cpShotWrapperStyle.join(''));
  dbColorSwatch.setAttribute('style', db2cpColorSwatchStyle.join(''));
  dbImage.setAttribute('style', db2cpImgStyle.join(''));
  dbImage.setAttribute('onerror', 'this.src=\'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIyNzRweCIgaGVpZ2h0PSIyMTZweCIgdmlld0JveD0iMCAwIDI3NCAyMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+ICAgICAgICA8dGl0bGU+R3JvdXA8L3RpdGxlPiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4gICAgPGRlZnM+ICAgICAgICA8cmVjdCBpZD0icGF0aC0xIiB4PSIwIiB5PSIwIiB3aWR0aD0iMjc0IiBoZWlnaHQ9IjIxNiI+PC9yZWN0PiAgICAgICAgPG1hc2sgaWQ9Im1hc2stMiIgbWFza0NvbnRlbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIG1hc2tVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIHg9IjAiIHk9IjAiIHdpZHRoPSIyNzQiIGhlaWdodD0iMjE2IiBmaWxsPSJ3aGl0ZSI+ICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPSIjcGF0aC0xIj48L3VzZT4gICAgICAgIDwvbWFzaz4gICAgPC9kZWZzPiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4gICAgICAgIDxnIGlkPSJHcm91cCI+ICAgICAgICAgICAgPHVzZSBpZD0iUmVjdGFuZ2xlLTIiIHN0cm9rZT0iI0JCQkJCQiIgbWFzaz0idXJsKCNtYXNrLTIpIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9IiNGM0YzRjMiIHhsaW5rOmhyZWY9IiNwYXRoLTEiPjwvdXNlPiAgICAgICAgICAgIDx0ZXh0IGlkPSJVaC1vaC06KCIgb3BhY2l0eT0iMC4zOTE5ODM2OTYiIGZvbnQtZmFtaWx5PSJIZWx2ZXRpY2FOZXVlLUJvbGQsIEhlbHZldGljYSBOZXVlIiBmb250LXNpemU9IjU1IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzAwMDAwMCI+ICAgICAgICAgICAgICAgIDx0c3BhbiB4PSIzNSIgeT0iMTExIj5VaCBvaCA6KDwvdHNwYW4+ICAgICAgICAgICAgPC90ZXh0PiAgICAgICAgICAgIDx0ZXh0IGlkPSJpbWFnZS1ub3QtbG9hZGVkIiBvcGFjaXR5PSIwLjM5MTk4MzY5NiIgZm9udC1mYW1pbHk9IkhlbHZldGljYU5ldWUtQm9sZCwgSGVsdmV0aWNhIE5ldWUiIGZvbnQtc2l6ZT0iMjUiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjMDAwMDAwIj4gICAgICAgICAgICAgICAgPHRzcGFuIHg9IjM1IiB5PSIxNDciPmltYWdlIG5vdCBsb2FkZWQ8L3RzcGFuPiAgICAgICAgICAgIDwvdGV4dD4gICAgICAgIDwvZz4gICAgPC9nPjwvc3ZnPg==\'');

  dbShotUrl.innerHTML = `🔗 <a href="${dbUrl}" style="color:inherit;text-decoration: none">${dbUrl}</a>`;
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


}());
