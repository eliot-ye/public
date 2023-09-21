// window.biometrics = function ({ promptMessage } = {}) {
//   return new Promise((resolve, reject) => {
//     const id =
//       Math.random().toString(36).slice(-8) + "_" + new Date().getTime();
//     window[id] = function (data) {
//       if (data.type === "biometrics" && data.id === id) {
//         if (data.statusCode === "SUC200") {
//           resolve({ verifySuccess: data.verifySuccess });
//         } else {
//           reject({ statusCode: data.statusCode, error: data.error });
//         }
//       }
//     };
//     window.ReactNativeWebView.postMessage(
//       JSON.stringify({ type: "biometrics", id, promptMessage })
//     );
//   });
// };

(function () {
  if (window.biometrics) {
    document.getElementById("has-biometrics").innerText = "has biometrics";
  }
  document
    .getElementById("btn-biometrics")
    .addEventListener("click", async () => {
      if (window.biometrics) {
        try {
          /**
           * @typedef ReturnObj
           * @property {'SUC200' | 'VRF403' | 'UNA404'} statusCode
           * @property {boolean} [verifySuccess]
           * @property {string} [error]
           */

          /**
           * @type {(option?: {promptMessage: string;}) => Promise<ReturnObj>}
           * */
          const biometrics = window.biometrics;
          const resultObject = await biometrics({
            promptMessage: "promptMessage test",
          });
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
