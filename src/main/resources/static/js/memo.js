const buildHTML = (XHR) => {
  const item = XHR.response;
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.createdAt}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
  return html;
};


function post (){
//  リクエストを送信する処理
//  console.log("イベント発火");
  const submit = document.getElementById("submit");

  // submit.addEventListener("click", () => {
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    const form = document.getElementById("form");
    const formData = new FormData(form);
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.response.error}`);
        return null;
      };
      // console.log(XHR.response);
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      // console.log(formText.value);
      // const item = XHR.response;
      // const html = `
      //   <div class="post">
      //     <div class="post-date">
      //       投稿日時：${item.createdAt}
      //     </div>
      //     <div class="post-content">
      //       ${item.content}
      //     </div>
      //   </div>`;
      // list.insertAdjacentHTML("afterend", html);
      list.insertAdjacentHTML("afterend", buildHTML(XHR));
      formText.value = "";
    };
  });
};

window.addEventListener('load', post);
