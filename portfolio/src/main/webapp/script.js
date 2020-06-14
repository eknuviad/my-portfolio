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
/**
 * Adds a random greeting to the page.
 */
function addRandomGreeting() {
  const greetings =
      ['Hello world!', '¡Hola Mundo!', '你好，世界！', 'Bonjour le monde!'];

  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
}


function loadComments() {
  fetch('/list-comments').then(response => response.json()).then((comments) => {
     const commentListElement = document.getElementById('comment-list');
    comments.forEach((comment) => {
      commentListElement.appendChild(createCommentElement(comment));
    })
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

    // Remove the task from the DOM.
    commentElement.remove();
  });

  commentElement.appendChild(nameElement);
  commentElement.appendChild(messageElement);
  commentElement.appendChild(breakElement);
  commentElement.appendChild(deleteButtonElement);
  return commentElement;
}


function submitComment(){
    var data = { };
    data.name = document.getElementById("name").value;
    data.message = document.getElementById("message").value;
    $.post("/new-comment", data, function() { 
        document.getElementById('comment-list').prepend(createCommentElement(data));
        $('#name').val('');
        $('#message').val('');
        // TODO add comment sent success message
    });
    return false;
}

/** Tells the server to delete the task. */
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
