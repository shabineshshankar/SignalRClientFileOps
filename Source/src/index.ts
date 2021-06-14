 
import * as signalR from "@microsoft/signalr";

const divMessages: HTMLDivElement = document.querySelector("#imitatetextbox");



const Filename: HTMLInputElement = document.querySelector("#filename");
const btnCreateFile: HTMLButtonElement = document.querySelector("#btnCreateFile");
const btnDeleteFile: HTMLButtonElement = document.querySelector("#btnDeleteFile");
const btnRenameFile: HTMLButtonElement = document.querySelector("#btnRenameFile");
const btnAppenedFileName: HTMLButtonElement = document.querySelector("#btnAppenedFileName");
const model: HTMLDialogElement = document.querySelector("#testmodel");

const username = new Date().getTime();

const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://127.0.0.1:7655/commHub").withAutomaticReconnect()
    .build();

connection.on("ReceiveMessage", (FileOpsModel) => {
  
    let messages = document.createElement("div");

    if (FileOpsModel.oldFileName == "") {
        messages.innerHTML =
            `<div class="message-author"><pre >DateTime:${FileOpsModel.dateTime} EventName: ${FileOpsModel.event} FileName:${FileOpsModel.fileName} </pre></div>`;
    } else {
        messages.innerHTML =
            `<div class="message-author"><pre>DateTime:${FileOpsModel.dateTime} EventName: ${FileOpsModel.event} 
              FileName:${FileOpsModel.fileName} OldName:${FileOpsModel.oldFileName} </pre></div>`;

    }
    divMessages.appendChild(messages);
    divMessages.scrollTop = divMessages.scrollHeight;
});


connection.on("HandleError", (HandleError:string) => {

    let messages = document.createElement("div");

    messages.innerHTML =
        `<div class="message-author"><pre style="color: red;">Error:${HandleError} </pre></div>`;

    divMessages.appendChild(messages);
    divMessages.scrollTop = divMessages.scrollHeight;
});


connection.start().catch(err => document.write(err));



btnCreateFile.addEventListener("click", CreateFile);
btnDeleteFile.addEventListener("click", DeleteFile);
btnRenameFile.addEventListener("click", RenameFile);
btnAppenedFileName.addEventListener("click", AppenedFile);

function CreateFile() {
    if (Filename.value=="") {
        alert("Please enter a filename in textbox")
        return;
    }
    connection.send("CreateFile", Filename.value);
    Filename.value = "";
}

function DeleteFile() {

    connection.send("DeleteFile");
 
}

function RenameFile() {
    if (Filename.value == "") {
        alert("Please enter a filename in textbox to rename ")
        return;
    }

    connection.send("RenameFile", Filename.value);
    Filename.value ="";

}

function AppenedFile() {

    if (Filename.value == "") {
        alert("Please enter a text to appened ")
        return;
    }
    connection.send("AppenedFileName", Filename.value);
    Filename.value ="";

}