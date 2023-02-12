import { useState } from 'react';

import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Notification from 'shared/components/Notification/Notification';

const Feedback = () => {
  const [reviews, setReviews] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const onFeedbackBtnClick = option => {
    setReviews(prevReviews => ({
      ...prevReviews,
      [option]: prevReviews[option] + 1,
    }));
  };

  const { good, neutral, bad } = reviews;

  const total = good + neutral + bad;

  const countPositiveFeedbackPercentage = () => {
    if (!total) return;

    const positiveFeedbackPercentage = (good * 100) / total;

    return Number(Math.round(positiveFeedbackPercentage));
  };

  const positivePercentage = countPositiveFeedbackPercentage();

  return (
    <Section>
      <FeedbackOptions
        options={Object.keys(reviews)}
        onFeedbackBtnClick={onFeedbackBtnClick}
      />
      {total ? (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={total}
          positivePercentage={positivePercentage}
        />
      ) : (
        <Notification message={'There is no feedback'} />
      )}
    </Section>
  );
};

export default Feedback;
