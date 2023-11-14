import init, { assemble } from "./pkg/assembler_by_wasm.js";

let mode = "2";
let selectedFile = null;
const fileInput = document.getElementById("fileInput");
const uploadButton = document.getElementById("assembleButton");
const downloadLink = document.getElementById("downloadLink");
const dropdown = document.getElementById("dropdown");

dropdown.addEventListener("change", () => {
  mode = dropdown.value;
});

fileInput.addEventListener("change", (event) => {
  selectedFile = (event.target).files[0];
});

uploadButton.addEventListener("click", () => {
  if (selectedFile) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const uploadedData = e.target.result;
      const binary_string = assemble(uploadedData, mode);
      downloadLink.href = `data:application/json;charset=utf-8,${encodeURIComponent(binary_string)}`;
    };

    reader.readAsText(selectedFile);
  }
});

init();
