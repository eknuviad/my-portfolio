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

// greeting function from server fetch tutorial
function getGreeting() {
  fetch('/data').then(response => response.json()).then((messages) => {
      document.getElementById('greeting-container').innerText = messages;
  });
}

function loadComments() {
  fetch('/list-comments').then(response => response.json()).then((comments) => {
    // const taskListElement = document.getElementById('task-list');
    comments.forEach((comment) => {
        console.log(comment);
    //   taskListElement.appendChild(createTaskElement(task));
    })
  });
}

function submitComment(){
    var data = { };
    data.name = document.getElementById("name").value;
    data.message = document.getElementById("message").value;
    $.post("/new-comment", data, function() { 
        loadComments();
        $('#name').val('');
        $('#message').val('');
        // TODO add comment sent success message
    });
    return false;
}
