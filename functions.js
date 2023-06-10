function validationInputTitleFromUser() {
  inputErrorMessageNode.classList.add('invisible');
  if (postTitleFromUser.value.length >= 0) {
    postTitleValidationMessageNode.innerText = `${postTitleFromUser.value.length}/50`;
    postTitleValidationMessageNode.classList.remove('overLength');
    postTitleFromUser.classList.remove('borderRed');
  }
  if (postTitleFromUser.value.length > 50) {
    postTitleValidationMessageNode.classList.add('overLength');
    postTitleFromUser.classList.add('borderRed');
  }
}

function validationInputTextFromUser() {
  inputErrorMessageNode.classList.add('invisible');
  if (postTextFromUser.value.length >= 0) {
    postTextValidationMessageNode.innerText = `${postTextFromUser.value.length}/1000`;
    postTextValidationMessageNode.classList.remove('overLength');
    postTextFromUser.classList.remove('borderRed');
  }
  if (postTextFromUser.value.length > 1000) {
    postTextValidationMessageNode.classList.add('overLength');
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
  localStorage.setItem(POSTS_LIST_LOCAL_STORAGE_KEY, postListStorage);
  postTitleFromUser.value = '';
  postTextFromUser.value = '';
  postListClearBtnNode.classList.remove('invisible');
}

function resetValidationMessages(
  postTitleValidationMessageNode,
  postTextValidationMessageNode
) {
  postTitleValidationMessageNode.innerText = '0/50';
  postTextValidationMessageNode.innerText = '0/1000';
  postTitleValidationMessageNode.classList.remove('overLength');
  postTextValidationMessageNode.classList.remove('overLength');
}

function showSubmitErrorMessage(inputErrorMessageNode) {
  if (!validationPassed(post)) {
    inputErrorMessageNode.classList.remove('invisible');
  }
}

function hideErrorMessage(inputErrorMessageNode) {
  inputErrorMessageNode.classList.add('invisible');
}

function validationTextInput() {
  inputErrorMessageNode.classList.add('invisible');
  if (postTextFromUser.value.length >= 0) {
    postTextValidationMessageNode.innerText = `${postTextFromUser.value.length}/1000`;
    postTextValidationMessageNode.classList.remove('overLength');
    postTextFromUser.classList.remove('borderRed');
  }
  if (postTextFromUser.value.length > 1000) {
    postTextValidationMessageNode.classList.add('overLength');
    postTextFromUser.classList.add('borderRed');
  }
}

function validationTitleInput() {
  inputErrorMessageNode.classList.add('invisible');
  if (postTitleFromUser.value.length >= 0) {
    postTitleValidationMessageNode.innerText = `${postTitleFromUser.value.length}/50`;
    postTitleValidationMessageNode.classList.remove('overLength');
    postTitleFromUser.classList.remove('borderRed');
  }
  if (postTitleFromUser.value.length > 50) {
    postTitleValidationMessageNode.classList.add('overLength');
    postTitleFromUser.classList.add('borderRed');
  }
}

function submitFormByClick() {
  getPostFromUser(postTitleFromUser, postTextFromUser);
  if (validationPassed(post)) {
    createPost(post);
    renderPosts(postsList);
    resetValidationMessages(
      postTitleValidationMessageNode,
      postTextValidationMessageNode
    );
    hideErrorMessage(inputErrorMessageNode);
  } else showSubmitErrorMessage(inputErrorMessageNode);
}

function submitFormByCltrlEnterInTitleInput(event) {
  if (event.which == '13') event.preventDefault();
  if (event.which == '13' && event.ctrlKey) {
    event.preventDefault();
    getPostFromUser(postTitleFromUser, postTextFromUser);
    if (validationPassed(post)) {
      createPost(post);
      renderPosts(postsList);
      resetValidationMessages(
        postTitleValidationMessageNode,
        postTextValidationMessageNode
      );
      hideErrorMessage(inputErrorMessageNode);
    } else showSubmitErrorMessage(inputErrorMessageNode);
  }
}

function submitFormByCtrlEnterInTextInput(event) {
  if (event.which == '13' && event.ctrlKey) {
    event.preventDefault();
    getPostFromUser(postTitleFromUser, postTextFromUser);
    if (validationPassed(post)) {
      createPost(post);
      renderPosts(postsList);
      resetValidationMessages(
        postTitleValidationMessageNode,
        postTextValidationMessageNode
      );
      hideErrorMessage(inputErrorMessageNode);
    } else showSubmitErrorMessage(inputErrorMessageNode);
  }
}

function clearLocalStorageAndRefreshLayout() {
  localStorage.clear();
  renderPosts((postsList = []));
  postsNode.innerHTML = POSTS_EMPTY_REFRESH_HTML;
  postListClearBtnNode.classList.add('invisible');
}
