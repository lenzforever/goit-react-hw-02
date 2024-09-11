import { useEffect, useState } from "react";
import "./App.css";
import Description from "./components/Description/Description";
import Options from "./components/Options/Options";
import Feedback from "./components/Feedback/Feedback";
import Notification from "./components/Notification/Notification";

function App() {
  const [feedback, setFeedback] = useState(() => {
    const savedFeedback = window.localStorage.getItem("feedbackData");
    return savedFeedback ? JSON.parse(savedFeedback) : { good: 0, neutral: 0, bad: 0 };
  });

  useEffect(() => {
    window.localStorage.setItem("feedbackData", JSON.stringify(feedback));
  }, [feedback]);

  const getTotal = feedback.good + feedback.neutral + feedback.bad;
  const positivePercentage = getTotal ? Math.round((feedback.good / getTotal) * 100) : 0;

  const handleFeedback = (type) => {
    setFeedback((prevState) => ({ ...prevState, [type]: prevState[type] + 1 }));
  };

  const handleReset = () => {
    setFeedback({ good: 0, neutral: 0, bad: 0 });
  };

  return (
    <div>
      <Description />
      <Options
        total={getTotal}
        update={handleFeedback}
        reset={handleReset}
      />
      {getTotal > 0 ? (
        <Feedback
          good={feedback.good}
          neutral={feedback.neutral}
          bad={feedback.bad}
          totalFeedback={getTotal}
          positiveFeedback={positivePercentage}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}

export default App;
