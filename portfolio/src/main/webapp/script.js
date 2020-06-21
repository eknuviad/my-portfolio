// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// TODO load header via javascript function on all pages.


var uploadUrl;

// Load existing comments, images. Retrieve upload url
function loadCommentsAndImages() {
    fetch('/list-comments').then(response => response.json()).then((comments) => {
    const commentListElement = document.getElementById('comment-list');
    comments.forEach((comment) => {
        commentListElement.appendChild(createImageElement(comment));
        commentListElement.appendChild(createCommentElement(comment));
    })
    });
    fetch('/blobstore-upload-url').then((response) => {
        return response.text();
        }) .then((imageUploadUrl) => {
        const messageForm = document.getElementById('my-form');
        console.log(imageUploadUrl);
        messageForm.action = imageUploadUrl;
        uploadUrl = imageUploadUrl;
        messageForm.classList.remove('hidden');
        });
}

/** Creates an element that represents a comment */
function createCommentElement(comment) {
  const commentElement = document.createElement('li');
  commentElement.className = 'comment';

  const nameElement = document.createElement('span');
  nameElement.innerText = "From" + " " + comment.name + ":";

  const messageElement = document.createElement('span');
  messageElement.innerText = comment.message;

  const breakElement = document.createElement('br');

  const deleteButtonElement = document.createElement('button');
  deleteButtonElement.innerText = 'Delete';
  deleteButtonElement.addEventListener('click', () => {
    deleteComment(comment);

    // Remove the comment from the DOM.
    commentElement.remove();
  });

  commentElement.appendChild(nameElement);
  commentElement.appendChild(messageElement);
  commentElement.appendChild(breakElement);
  commentElement.appendChild(deleteButtonElement);
   commentElement.appendChild(breakElement);
  return commentElement;
}

/** Creates an element that represents an Image */
function createImageElement(response) {
    const imageElement = document.createElement('li');
    imageElement.className = 'comment';

    const breakElement = document.createElement('br');
    if(response.imageUrl){
        var img = document.createElement('img');
        img.src = response.imageUrl;
        imageElement.appendChild(img);
    }
    imageElement.appendChild(breakElement);
    return imageElement;
}

function submitComment(){
    var form = $('#my-form')[0];
    var data = new FormData(form);
    $.ajax({
        type:"POST",
        enctype: 'multipart/form-data',
        url: uploadUrl,
        data:data,
        processData: false, //prevents jquery from converting data into query string
        contentType: false,
        cache: false,
        timeout: 600000,
        success: function (response) {
            document.getElementById('comment-list').prepend(createImageElement(response));
            document.getElementById('comment-list').prepend(createCommentElement(response));
            console.log("SUCCESS : ", response);
        },
        error: function (e) {
            $("#result").text(e.responseText);
            console.log("ERROR : ", e);
        }
    });

    return false;
}

/** Tells the server to delete the Comment. */
function deleteComment(comment) {
  const params = new URLSearchParams();
  params.append('id', comment.id);
  fetch('/delete-comment', {method: 'POST', body: params});
}

// Get DOM elements
var modal = document.getElementById('my-modal');
var modalBtn = document.getElementById('modal-btn');
var closeBtn = document.getElementsByClassName('closeBtn')[0];

// Events
modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

// Open
function openModal() {
  modal.style.display = 'block';
}

// Close
function closeModal() {
  modal.style.display = 'none';
}

// Close If Outside Click
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}
