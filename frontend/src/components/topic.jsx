// components/Topic.js
import React from 'react';
import { Link } from 'react-router-dom';

function Topic({ topic }) {
  return (
    <>
      <Link style={{textDecoration:'none'}} to={`/topics/${topic.id}/?page=1`}>{topic.title}
        <span style={{ display: 'block', margin: '5px 0', fontSize:'medium', textAlign:'right' }}> Most recent post: {topic.most_recent}</span>
        <span style={{ display: 'block', margin: '5px 0', fontSize:'medium', textAlign:'right' }}> post count:{topic.num_posts}</span>
      </Link>
    </>
  );
}

export default Topic;
