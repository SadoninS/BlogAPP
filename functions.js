function validationInputTitleFromUser() {
  inputErrorMessage.classList.add('invisible');
  if (postTitleFromUser.value.length >= 0) {
    postTitleValidationMessage.innerText = `${postTitleFromUser.value.length}/50`;
    postTitleValidationMessage.classList.remove('overLength');
    postTitleFromUser.classList.remove('borderRed');
  }
  if (postTitleFromUser.value.length > 50) {
    postTitleValidationMessage.classList.add('overLength');
    postTitleFromUser.classList.add('borderRed');
  }
}

function validationInputTextFromUser() {
  inputErrorMessage.classList.add('invisible');
  if (postTextFromUser.value.length >= 0) {
    postTextValidationMessage.innerText = `${postTextFromUser.value.length}/1000`;
    postTextValidationMessage.classList.remove('overLength');
    postTextFromUser.classList.remove('borderRed');
  }
  if (postTextFromUser.value.length > 1000) {
    postTextValidationMessage.classList.add('overLength');
    postTextFromUser.classList.add('borderRed');
  }
}

function getPostFromUser(postTitleFromUser, postTextFromUser) {
  const dt = new Date();
  const dtOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  post.date = dt.toLocaleString('ru', dtOptions);
  post.title = postTitleFromUser.value.trim();
  post.text = postTextFromUser.value.trim();

  return post;
}

function emptyStringValidation(post) {
  return post.title !== '' && post.text !== '';
}

function lengthValidation(post) {
  return post.title.length <= 50 && post.text.length <= 1000;
}

function validationPassed(post) {
  return lengthValidation(post) && emptyStringValidation(post);
}

function createPost(post) {
  postsList.push(
    (postsNode.innerHTML = `<div class="post">
                            <p class='post-date'>${post.date}</p>
                            <h3 class='post-title'>${post.title}</h3>
                            <p class='post-text'>${post.text}</p>
                          </div>`)
  );
  const postListStorage = JSON.stringify(postsList);
  localStorage.setItem('postlist', postListStorage);
  postTitleFromUser.value = '';
  postTextFromUser.value = '';
  postListClearBtnNode.classList.remove('invisible');
}

function resetValidationMessages(
  postTitleValidationMessage,
  postTextValidationMessage
) {
  postTitleValidationMessage.innerText = '0/50';
  postTextValidationMessage.innerText = '0/1000';
  postTitleValidationMessage.classList.remove('overLength');
  postTextValidationMessage.classList.remove('overLength');
}

function showSubmitErrorMessage(inputErrorMessage) {
  if (!validationPassed(post)) {
    inputErrorMessage.classList.remove('invisible');
  }
}

function hideErrorMessage(inputErrorMessage) {
  inputErrorMessage.classList.add('invisible');
}
