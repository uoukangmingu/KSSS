const postList = document.getElementById('post-list');
const postForm = document.getElementById('post-form');
const postTitle = document.getElementById('post-title');
const postContent = document.getElementById('post-content');
const postSubmit = document.getElementById('post-submit');

const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const signupBackBtn = document.getElementById('signup-back-btn');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginBtn = document.getElementById('login-btn');
const signupName = document.getElementById('signup-name');
const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');
const signupBtn = document.getElementById('signup-btn');
const signupLink = document.getElementById('signup-link');
const writePostBtn = document.getElementById('write-post-btn');
const anonymousWrite = document.getElementById('anonymous-write');

let posts = JSON.parse(localStorage.getItem('posts')) || [];
let users = JSON.parse(localStorage.getItem('users')) || [];
let nickname = '익명';
let isLoggedIn = false;
let anonymousCount = 1;

postSubmit.addEventListener('click', () => {
  if (postTitle.value.trim() !== '' && postContent.value.trim() !== '') {
    const newPost = {
      title: postTitle.value.trim(),
      content: postContent.value.trim(),
      author: isLoggedIn ? nickname : `익명${anonymousCount}`,
    };
    posts.unshift(newPost);
    if (!isLoggedIn) {
      anonymousCount++;
    }
    postTitle.value = '';
    postContent.value = '';
    renderPosts();
    saveData();
  }
});

function renderPosts() {
postList.innerHTML = '';

posts.slice().reverse().forEach((post, index) => {
const postElement = document.createElement('div');
postElement.className = 'post';


let author = post.author || '익명';
if (!isLoggedIn && author === '익명') {
  author = `익명${anonymousCount}`;
  anonymousCount++;
}

const headerElement = document.createElement('div');
headerElement.className = 'post-header';
headerElement.style.display = 'flex';
headerElement.style.justifyContent = 'space-between';
headerElement.style.alignItems = 'center';

const titleElement = document.createElement('div');
titleElement.className = 'post-title';
titleElement.style.fontWeight = 'bold';
titleElement.style.fontSize = '1.1em';
titleElement.style.marginRight = '10px';
titleElement.textContent = post.title || '(제목없음)';

const authorElement = document.createElement('div');
authorElement.className = 'post-author';
authorElement.style.fontWeight = '300';
authorElement.style.textAlign = 'right';
authorElement.textContent = author;

const contentElement = document.createElement('div');
contentElement.className = 'post-content';
contentElement.style.marginTop = '10px';
contentElement.textContent = post.content;

const deletePostBtn = document.createElement('button');
deletePostBtn.textContent = '삭제';
deletePostBtn.classList.add('delete-btn'); // CSS 클래스 추가
deletePostBtn.style.marginLeft = '5px'; // 왼쪽 마진 20px 추가
deletePostBtn.addEventListener('click', () => {
  if (post.author === nickname) {
    posts.splice(posts.length - index - 1, 1); // 해당 인덱스의 글 삭제
    renderPosts();
    saveData();
  } else {
    alert('작성자만 삭제할 수 있습니다.');
  }
});

  if (post.author === nickname) {
    postElement.appendChild(deletePostBtn);
  }
headerElement.appendChild(titleElement);
headerElement.appendChild(authorElement);
postElement.appendChild(headerElement);
postElement.appendChild(contentElement);
postElement.appendChild(deletePostBtn);
postList.prepend(postElement);
});

  const logoutButton = document.getElementById('logout-button');
  if (logoutButton) {
    logoutButton.remove();
  }

if (isLoggedIn) {
  postForm.appendChild(postSubmit);

  const logoutButton = document.createElement('button');
  logoutButton.id = 'logout-button';
  logoutButton.textContent = '로그아웃';
  logoutButton.addEventListener('click', () => {
    isLoggedIn = false;
    nickname = '익명';
    loginForm.style.display = 'block';
    postForm.style.display = 'none';
    renderPosts();
  });

  postForm.appendChild(logoutButton);
} else {
  postForm.appendChild(postSubmit);
}

  document.body.prepend(postForm);
}

renderPosts();

loginBtn.addEventListener('click', () => {
  if (loginEmail.value.trim() === '' || loginPassword.value.trim() === '') {
    alert('이메일과 비밀번호를 입력해주세요.');
    return;
  }
  const user = users.find(u => u.email === loginEmail.value && u.password === loginPassword.value);
  if (user) {
    loginForm.style.display = 'none';
    nickname = user.name;
    isLoggedIn = true;
    postForm.style.display = 'block';
    renderPosts();
  } else {
    alert('이메일 또는 비밀번호가 일치하지 않습니다.');
  }
});

signupBtn.addEventListener('click', () => {
  let isValid = true;

  if (!signupName.value.trim()) {
    alert('닉네임이 입력되지 않았습니다.');
    isValid = false;
  } else if (users.some(user => user.name === signupName.value.trim())) {
    alert('이미 사용 중인 닉네임입니다. 다른 닉네임을 입력해주세요.');
    isValid = false;
  }

  // 이메일 중복 체크
  if (!signupEmail.value.trim()) {
    alert('이메일이 입력되지 않았습니다.');
    isValid = false;
  } else if (users.some(user => user.email === signupEmail.value.trim())) {
    alert('이미 가입된 이메일입니다. 로그인 화면으로 이동합니다.');
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
    isValid = false;
  }

  // 비밀번호 입력 확인
  if (!signupPassword.value.trim()) {
    alert('비밀번호가 입력되지 않았습니다.');
    isValid = false;
  }

if (isValid) {
const newUser = {
name: signupName.value.trim(),
email: signupEmail.value.trim(),
password: signupPassword.value.trim()
};
users.push(newUser);
localStorage.setItem('users', JSON.stringify(users));
alert('회원가입이 완료되었습니다.');
signupForm.style.display = 'none';
loginForm.style.display = 'block';
}
});

signupBackBtn.addEventListener('click', () => {
  signupName.value = '';
  signupEmail.value = '';
  signupPassword.value = '';
  signupForm.style.display = 'none';
  loginForm.style.display = 'block';
});


signupLink.addEventListener('click', () => {
signupForm.style.display = 'block';
loginForm.style.display = 'none';
});

writePostBtn.addEventListener('click', () => {
if (isLoggedIn) {
postForm.style.display = 'block';
writePostBtn.style.display = 'none';
} else {
loginForm.style.display = 'block';
writePostBtn.style.display = 'none';
}
});


anonymousWrite.addEventListener('click', () => {
  postForm.style.display = 'block';
  loginForm.style.display = 'none';
  writePostBtn.style.display = 'none';

  // 닫기 버튼이 이미 존재하는지 확인
  const existingCloseButton = postForm.querySelector('button');
  if (!existingCloseButton) {
    // 닫기 버튼이 없다면 새로 생성
    const closeButton = document.createElement('button');
    closeButton.textContent = '닫기';
    closeButton.addEventListener('click', () => {
      postForm.style.display = 'none';
      writePostBtn.style.display = 'block';
    });
    closeButton.style.marginTop = '10px';
    postForm.appendChild(closeButton);
  }

  nickname = '익명';
  isLoggedIn = false;
});


postSubmit.addEventListener('click', () => {
if (postTitle.value.trim() !== '' && postContent.value.trim() !== '') {
const newPost = {
title: postTitle.value.trim(),
content: postContent.value.trim(),
author: nickname,
};
posts.unshift(newPost);
postTitle.value = '';
postContent.value = '';
renderPosts();
}
});
const closeButton = document.createElement('button');
closeButton.textContent = '닫기';
closeButton.classList.add('close-btn');
closeButton.addEventListener('click', () => {
  postForm.style.display = 'none';
  writePostBtn.style.display = 'block';
});
postForm.appendChild(closeButton);

function saveData() {
localStorage.setItem('posts', JSON.stringify(posts));
localStorage.setItem('users', JSON.stringify(users));
}
