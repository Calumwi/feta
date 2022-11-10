const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const Post = require('../../models/post');
const User = require('../../models/user');
const Comment = require('../../models/comment');
const TokenGenerator = require('../../models/token_generator');
const JWT = require("jsonwebtoken");
let token;

describe("/comments", () => {
  beforeAll( async () => {
    const user = new User({name: "bob", email: "test@test.com", password: "12345678"});
    await user.save();
    token = TokenGenerator.jsonwebtoken(user.id);
  });

  beforeEach( async () => {
    await Post.deleteMany({});
    await Comment.deleteMany({});
  })

  afterAll( async () => {
    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});
  })

  describe("POST, when token is present", () => {
    test("responds with a 201", async () => {
      let response = await request(app)
        .post("/comments")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "hello world", token: token });
      expect(response.status).toEqual(201);
    });
  
    test("creates a new comment", async () => {
      await request(app)
        .post("/comments")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "hello world", token: token });
      let comments = await Comment.find();
      expect(comments.length).toEqual(1);
      expect(comments[0].message).toEqual("hello world");
    });
  
    test("returns a new token", async () => {
      let response = await request(app)
        .post("/comments")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "hello world", token: token })
      let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
      let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
      expect(newPayload.iat > originalPayload.iat).toEqual(true);
    });  
  });
  
  describe("POST, when token is missing", () => {
    test("responds with a 401", async () => {
      let response = await request(app)
        .post("/comments")
        .send({ message: "hello again world" });
      expect(response.status).toEqual(401);
    });
  
    test("a post is not created", async () => {
      await request(app)
        .post("/comments")
        .send({ message: "hello again world" });
      let comments = await Comment.find();
      expect(comments.length).toEqual(0);
    });
  
    test("a token is not returned", async () => {
      let response = await request(app)
        .post("/comments")
        .send({ message: "hello again world" });
      expect(response.body.token).toEqual(undefined);
    });
  })

  describe("GET, when token is present", () => {
    test("returns every post in the collection in reverse", async () => {
      let comment1 = new Comment({message: "howdy!"});
      let comment2 = new Comment({message: "hola!"});
      await comment1.save();
      await comment2.save();
      let response = await request(app)
        .get("/comments")
        .set("Authorization", `Bearer ${token}`)
        .send({token: token});
      let messages = response.body.comments.map((comment) => ( comment.message ));
      expect(messages).toEqual(["hola!", "howdy!"]);
    })

    test("the response code is 200", async () => {
      let comment1 = new Comment({message: "howdy!"});
      let comment2 = new Comment({message: "hola!"});
      await comment1.save();
      await comment2.save();
      let response = await request(app)
        .get("/comments")
        .set("Authorization", `Bearer ${token}`)
        .send({token: token});
      expect(response.status).toEqual(200);
    })

    test("returns a new token", async () => {
      let comment1 = new Comment({message: "howdy!"});
      let comment2 = new Comment({message: "hola!"});
      await comment1.save();
      await comment2.save();
      let response = await request(app)
        .get("/comments")
        .set("Authorization", `Bearer ${token}`)
        .send({token: token});
      let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
      let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
      expect(newPayload.iat > originalPayload.iat).toEqual(true);
    })
  })

  describe("GET, when token is missing", () => {
    test("returns no posts", async () => {
      let comment1 = new Comment({message: "howdy!"});
      let comment2 = new Comment({message: "hola!"});
      await comment1.save();
      await comment2.save();
      let response = await request(app)
        .get("/comments");
      expect(response.body.comments).toEqual(undefined);
    })

    test("the response code is 401", async () => {
      let comment1 = new Comment({message: "howdy!"});
      let comment2 = new Comment({message: "hola!"});
      await comment1.save();
      await comment2.save();
      let response = await request(app)
        .get("/comments");
      expect(response.status).toEqual(401);
    })

    test("does not return a new token", async () => {
      let comment1 = new Comment({message: "howdy!"});
      let comment2 = new Comment({message: "hola!"});
      await comment1.save();
      await comment2.save();
      let response = await request(app)
        .get("/comments");
      expect(response.body.token).toEqual(undefined);
    })
  })

  describe("GET, when token is present", () => {
    test("returns every comment in the post in reverse", async () => {
      let post1 = new Post({message: "i am a post"});
      let post2 = new Post({message: "i am a post too"});
      let comment1 = new Comment({message: "hallo!", post: post1}); //this line is bad and i feel bad
      let comment2 = new Comment({message: "bonjour!", post: post2});
      await comment1.save();
      await comment2.save();
      let response = await request(app)
        .get(`/comments?post_id=${post1._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({token: token});
      let messages = response.body.comments.map((comment) => ( comment.message ));
      expect(messages).toEqual(["hallo!"]);
    });
  });
});