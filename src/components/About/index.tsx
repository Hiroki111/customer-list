import React from 'react';
import './styles.scss';

export const About = () => {
  return (
    <div className="about-container">
      <h2>About this app</h2>
      <p>This is a CRUD application which was made mainly for training purposes.</p>
      <p>The objective was to teach myself React with Typescrpt and React Hooks.</p>
      <p>Any similarity to actual persons or groups that you find on this app is unintentional.</p>
      <p>
        The developer's information can be found from{' '}
        <a href="https://github.com/Hiroki111" target="_blank">
          here.
        </a>
      </p>
      <h2>当ウェブサイトについて</h2>
      <p>当ウェブサイトは主にTypescrptとReact Hooksを習得するのが目的で作られたものです。</p>
      <p>実在する人物や団体名があったとしても、それらは当ウェブサイトとは無関係です。</p>
      <p>
        開発者の情報は
        <a href="https://github.com/Hiroki111" target="_blank">
          こちら
        </a>
        から。
      </p>
    </div>
  );
};
