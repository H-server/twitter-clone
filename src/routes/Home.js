import React from "react";
import { useState } from "react";
import { dbService } from "../fbase";

const Home = () => {
  const [tweet, setTweet] = useState("");
  const onSubmit = async(event) => {
    event.preventDefault();
    await dbService.collection('tweet').add({
        tweet,
        createdAt: Date.now(),
    });
    setTweet('');
  };
  const onChange = (event) => {
    setTweet(event.target.value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={tweet}
          placeholder="What's on your mind?"
          maxLength={150}
          type="text"
          onChange={onChange}
        />
        <input type="submit" value="Tweet" />
      </form>
    </div>
  );
};
export default Home;
