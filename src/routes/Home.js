import React from "react";
import { useState, useEffect } from "react";
import { dbService } from "../fbase";

const Home = () => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const getTweets = async() => {
    const dbTweets = await dbService.collection("tweet").get();
    dbTweets.forEach(document => {
        const tweetObject = {
            ...document.data(),
            id: document.id,
        };

        setTweets(prev => [tweetObject, ...prev]);
    });
  };
  useEffect(() => {
    getTweets();
  }, []);

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
      <div>
        {tweets.map((tweet) => (
          <div key={tweet.id}>
            <h4>{tweet.tweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
