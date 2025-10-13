import axios from "axios";
import MockAdapter from "axios-mock-adapter";

axios.defaults.baseURL = "http://mock-api.local";
axios.defaults.headers["Authorization"] =
  `Bearer ${localStorage.getItem("token")}`;

// Мок адаптер
const mock = new MockAdapter(axios, { delayResponse: 500 });

// ------------------ Данные в памяти ------------------
let worksDB = [
  { id: 1, title: "Работа 1", userId: 1 },
  { id: 2, title: "Работа 2", userId: 1 },
];

let skillsDB = [
  { id: 1, name: "Vue", level: "advanced" },
  { id: 2, name: "JavaScript", level: "advanced" },
];

let blogDB = [
  { id: 1, title: "Пост 1", content: "Текст поста 1" },
  { id: 2, title: "Пост 2", content: "Текст поста 2" },
];

let usersDB = [
  { id: 1, name: "Иван", email: "ivan@mail.com" },
  { id: 2, name: "Мария", email: "maria@mail.com" },
];

// ------------------ WORKS ------------------
mock.onGet(/\/works\/\d+/).reply((config) => {
  const userId = parseInt(config.url.split("/").pop());
  const data = worksDB.filter((work) => work.userId === userId);
  return [200, data];
});

mock.onPost("/works").reply((config) => {
  const newWork = JSON.parse(config.data);
  newWork.id = Math.floor(Math.random() * 10000);
  worksDB.push(newWork);
  return [201, newWork];
});

mock.onDelete(/\/works\/\d+/).reply((config) => {
  const workId = parseInt(config.url.split("/").pop());
  worksDB = worksDB.filter((work) => work.id !== workId);
  return [200, workId];
});

// ------------------ SKILLS ------------------
mock.onGet("/skills").reply(200, skillsDB);

mock.onPost("/skills").reply((config) => {
  const newSkill = JSON.parse(config.data);
  newSkill.id = Math.floor(Math.random() * 10000);
  skillsDB.push(newSkill);
  return [201, newSkill];
});

mock.onDelete(/\/skills\/\d+/).reply((config) => {
  const skillId = parseInt(config.url.split("/").pop());
  skillsDB = skillsDB.filter((skill) => skill.id !== skillId);
  return [200, skillId];
});

// ------------------ BLOG ------------------
mock.onGet("/blog").reply(200, blogDB);

mock.onPost("/blog").reply((config) => {
  const newPost = JSON.parse(config.data);
  newPost.id = Math.floor(Math.random() * 10000);
  blogDB.push(newPost);
  return [201, newPost];
});

mock.onDelete(/\/blog\/\d+/).reply((config) => {
  const postId = parseInt(config.url.split("/").pop());
  blogDB = blogDB.filter((post) => post.id !== postId);
  return [200, postId];
});

// ------------------ USER ------------------
mock.onGet("/user").reply(200, usersDB);

mock.onPost("/user").reply((config) => {
  const newUser = JSON.parse(config.data);
  newUser.id = Math.floor(Math.random() * 10000);
  usersDB.push(newUser);
  return [201, newUser];
});

mock.onDelete(/\/user\/\d+/).reply((config) => {
  const userId = parseInt(config.url.split("/").pop());
  usersDB = usersDB.filter((user) => user.id !== userId);
  return [200, userId];
});

export default axios;
