import { useEffect, useState } from "react";
import "./App.css";
import Description from "./components/Description/Description";
import Options from "./components/Options/Options";
import Feedback from "./components/Feedback/Feedback";
import Notification from "./components/Notification/Notification";

function App() {
  const [options, setOptions] = useState(() => {
    const savedOptions = window.localStorage.getItem("options");

    if (savedOptions !== null) {
      return JSON.parse(savedOptions);
    }

    return {
      good: 0,
      neutral: 0,
      bad: 0,
    };
  });

  useEffect(() => {
    window.localStorage.setItem("options", JSON.stringify(options));
  }, [options]);

  const totalFeedback = options.good + options.neutral + options.bad;
  const positiveFeedback = Math.round((options.good / totalFeedback) * 100);

  const updateFeedback = (feedbackType) => {
    setOptions({ ...options, [feedbackType]: options[feedbackType] + 1 });
  };

  const resetFeedback = () => {
    setOptions({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  return (
    <div>
      <Description />
      <Options
        total={totalFeedback}
        update={updateFeedback}
        reset={resetFeedback}
      />
      {totalFeedback ? (
        <Feedback
          good={options.good}
          neutral={options.neutral}
          bad={options.bad}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}

export default App;
