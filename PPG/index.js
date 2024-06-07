// window.appVerify = function ({ promptMessage } = {}) {
//   return new Promise((resolve, reject) => {
//     const id =
//       Math.random().toString(36).slice(-8) + "_" + new Date().getTime();
//     window[id] = function (data) {
//       if (data.type === "appVerify" && data.id === id) {
//         if (data.statusCode === "SUC200") {
//           resolve({ verifySuccess: data.verifySuccess });
//         } else {
//           reject({ statusCode: data.statusCode, error: data.error });
//         }
//       }
//     };
//     window.ReactNativeWebView.postMessage(
//       JSON.stringify({ type: "appVerify", id, promptMessage })
//     );
//   });
// };

(function () {
  document.getElementById("btn-close").addEventListener(() => {
    if (window.webviewST) {
      window.webviewST.close();
    }
  });
  document.getElementById("btn-hideHeader").addEventListener(() => {
    if (window.webviewST) {
      window.webviewST.hideHeader();
    }
  });
  document.getElementById("btn-showHeader").addEventListener(() => {
    if (window.webviewST) {
      window.webviewST.showHeader();
    }
  });
  document.getElementById("inApp").innerText = window.inApp || "false";
  document.getElementById("has-appVerify").innerText = window.appVerify
    ? "yes"
    : "no";

  document
    .getElementById("btn-appVerify")
    .addEventListener("click", async () => {
      if (window.appVerify) {
        try {
          const resultObject = await window.appVerify();
          // const resultObject = await window.appVerify({
          //   promptMessage: "Verifying your identity",
          // });
          document.getElementById("result").innerHTML =
            JSON.stringify(resultObject);
        } catch (error) {
          document.getElementById("result").innerHTML = JSON.stringify(error);
        }
      }
    });

  document.getElementById("btn-reset").addEventListener("click", () => {
    window.location.reload();
  });
})();
