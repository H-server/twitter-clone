import React from "react";
import { useState, useEffect } from "react";
import { dbService } from "../fbase";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    dbService.collection("tweets").onSnapshot((snapshot) => {
        const tweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTweets(tweetArray);
      });
  }, []);

  const onSubmit = async(event) => {
    event.preventDefault();
    await dbService.collection('tweets').add({
        text: tweet,
        createdAt: Date.now(),
        createdId: userObj.uid,
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
      <div>
        {tweets.map((tweet) => (
          <div key={tweet.id}>
            <h4>{tweet.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
