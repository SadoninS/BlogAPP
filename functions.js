function clearLocalStorageAndRefreshLayout() {
  localStorage.clear();
  renderPosts((postsList = []));
  postsNode.innerHTML = POSTS_EMPTY_REFRESH_HTML;
  postListClearBtnNode.classList.add('invisible');
}

function validateTitleInput() {
  inputErrorMessageNode.classList.add('invisible');
  if (postTitleFromUserNode.value.length >= 0) {
    postTitleValidationMessageNode.innerText = `${postTitleFromUserNode.value.length}/50`;
    postTitleValidationMessageNode.classList.remove('overLength');
    postTitleFromUserNode.classList.remove('borderRed');
  }
  if (postTitleFromUserNode.value.length > 50) {
    postTitleValidationMessageNode.classList.add('overLength');
    postTitleFromUserNode.classList.add('borderRed');
  }
}

function validateTextInput() {
  inputErrorMessageNode.classList.add('invisible');
  if (postTextFromUserNode.value.length >= 0) {
    postTextValidationMessageNode.innerText = `${postTextFromUserNode.value.length}/500`;
    postTextValidationMessageNode.classList.remove('overLength');
    postTextFromUserNode.classList.remove('borderRed');
  }
  if (postTextFromUserNode.value.length > 500) {
    postTextValidationMessageNode.classList.add('overLength');
    postTextFromUserNode.classList.add('borderRed');
  }
}

function emptyStringValidation(post) {
  return post.title !== '' && post.text !== '';
}

function lengthValidation(post) {
  return post.title.length <= 50 && post.text.length <= 500;
}

function validationPassed(post) {
  return lengthValidation(post) && emptyStringValidation(post);
}

function resetValidationMessages(
  postTitleValidationMessageNode,
  postTextValidationMessageNode
) {
  postTitleValidationMessageNode.innerText = POST_TITLE_VALIDATION_MESSAGE;
  postTextValidationMessageNode.innerText = POST_TEXT_VALIDATION_MESSAGE;
  postTitleValidationMessageNode.classList.remove('overLength');
  postTextValidationMessageNode.classList.remove('overLength');
}

function showSubmitErrorMessage(inputErrorMessageNode) {
  if (!validationPassed(post)) {
    inputErrorMessageNode.classList.remove('invisible');
  }
}

function hideSubmitErrorMessage(inputErrorMessageNode) {
  inputErrorMessageNode.classList.add('invisible');
}

function submitFormByClick() {
  getPostFromUser(postTitleFromUserNode, postTextFromUserNode);
  if (validationPassed(post)) {
    createPost(post);
    renderPosts(postsList);
    resetValidationMessages(
      postTitleValidationMessageNode,
      postTextValidationMessageNode
    );
    hideSubmitErrorMessage(inputErrorMessageNode);
  } else showSubmitErrorMessage(inputErrorMessageNode);
}

function submitFormByCltrlEnterInTitleInput(event) {
  if (event.which == '13') event.preventDefault();
  if (event.which == '13' && event.ctrlKey) {
    event.preventDefault();
    getPostFromUser(postTitleFromUserNode, postTextFromUserNode);
    if (validationPassed(post)) {
      createPost(post);
      renderPosts(postsList);
      resetValidationMessages(
        postTitleValidationMessageNode,
        postTextValidationMessageNode
      );
      hideSubmitErrorMessage(inputErrorMessageNode);
    } else showSubmitErrorMessage(inputErrorMessageNode);
  }
}

function submitFormByCtrlEnterInTextInput(event) {
  if (event.which == '13' && event.ctrlKey) {
    event.preventDefault();
    getPostFromUser(postTitleFromUserNode, postTextFromUserNode);
    if (validationPassed(post)) {
      createPost(post);
      renderPosts(postsList);
      resetValidationMessages(
        postTitleValidationMessageNode,
        postTextValidationMessageNode
      );
      hideSubmitErrorMessage(inputErrorMessageNode);
    } else showSubmitErrorMessage(inputErrorMessageNode);
  }
}

function getPostFromUser(postTitleFromUserNode, postTextFromUserNode) {
  const dt = new Date();
  const dtOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  post.date = dt.toLocaleString('ru', dtOptions);
  post.title = postTitleFromUserNode.value.trim();
  post.text = postTextFromUserNode.value.trim();

  return post;
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
  postTitleFromUserNode.value = '';
  postTextFromUserNode.value = '';
  postListClearBtnNode.classList.remove('invisible');
}
